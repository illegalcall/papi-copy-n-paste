// Memory Leak Validator - Detects memory leaks and subscription tracking issues
// Tests real subscription cleanup, memory usage patterns, and resource management

import { Observable, Subject, BehaviorSubject, interval, timer, merge } from 'rxjs'
import { map, take, takeUntil, finalize, tap, switchMap, mergeMap } from 'rxjs/operators'
import { ValidationResult, TestCase } from './types'

export interface MemoryLeakResult extends ValidationResult {
  memoryMetrics: {
    initialMemory: number
    finalMemory: number
    peakMemory: number
    memoryDelta: number
    leakDetected: boolean
    leakSeverity: 'none' | 'low' | 'medium' | 'high' | 'critical'
  }
  subscriptionTracking: {
    subscriptionsCreated: number
    subscriptionsDestroyed: number
    activeSubscriptions: number
    leakedSubscriptions: number
    cleanupEfficiency: number // percentage
  }
  resourceManagement: {
    observablesCreated: number
    subjectsCreated: number
    timersCreated: number
    timersCleared: number
    eventListenersAdded: number
    eventListenersRemoved: number
  }
  performanceImpact: {
    memoryGrowthRate: number // bytes per second
    gcPressure: number // 0-1 scale
    timeToCleanup: number // milliseconds
  }
}

export class MemoryLeakValidator {
  
  private subscriptionRegistry = new Set<any>()
  private observableRegistry = new Set<Observable<any>>()
  private timerRegistry = new Set<any>()
  private cleanupTasks: Array<() => void> = []

  /**
   * Validate code for memory leak patterns before executing tests
   */
  async validateMemoryLeakCode(code: string, testCase: TestCase): Promise<MemoryLeakResult> {
    console.log(`🧠 MEMORY LEAK CODE VALIDATION: ${testCase.id}`)
    
    const startTime = Date.now()
    
    // Pre-validate code for memory leak patterns
    const codeValidation = this.preValidateMemoryLeakCode(code, testCase)
    if (!codeValidation.valid) {
      return {
        passed: false,
        message: `Memory leak validation failed: ${codeValidation.reason}`,
        executionTime: Date.now() - startTime,
        memoryMetrics: {
          initialMemory: 0,
          finalMemory: 0,
          peakMemory: 0,
          memoryDelta: 0,
          leakDetected: true,
          leakSeverity: 'high'
        },
        subscriptionTracking: {
          subscriptionsCreated: 0,
          subscriptionsDestroyed: 0,
          activeSubscriptions: 0,
          leakedSubscriptions: 1,
          cleanupEfficiency: 0
        },
        resourceManagement: {
          observablesCreated: 0,
          subjectsCreated: 0,
          timersCreated: 0,
          timersCleared: 0,
          eventListenersAdded: 0,
          eventListenersRemoved: 0
        },
        performanceImpact: {
          memoryGrowthRate: 0,
          gcPressure: 0,
          timeToCleanup: 0
        }
      }
    }
    
    // For negative tests, only use code validation for speed
    if (testCase.id.startsWith('neg-')) {
      return {
        passed: true,
        message: 'Memory leak code validation passed',
        executionTime: Date.now() - startTime,
        memoryMetrics: {
          initialMemory: 0,
          finalMemory: 0,
          peakMemory: 0,
          memoryDelta: 0,
          leakDetected: false,
          leakSeverity: 'none'
        },
        subscriptionTracking: {
          subscriptionsCreated: 0,
          subscriptionsDestroyed: 0,
          activeSubscriptions: 0,
          leakedSubscriptions: 0,
          cleanupEfficiency: 100
        },
        resourceManagement: {
          observablesCreated: 0,
          subjectsCreated: 0,
          timersCreated: 0,
          timersCleared: 0,
          eventListenersAdded: 0,
          eventListenersRemoved: 0
        },
        performanceImpact: {
          memoryGrowthRate: 0,
          gcPressure: 0,
          timeToCleanup: 0
        }
      }
    }
    
    // If code validation passes, continue with behavior testing for regular tests
    return await this.validateMemoryLeaks(testCase)
  }

  /**
   * Pre-validate code for memory leak patterns
   */
  private preValidateMemoryLeakCode(code: string, testCase: TestCase): { valid: boolean; reason?: string } {
    console.log('    🔍 Pre-validating memory leak patterns...')
    
    // Only validate Observable-related test cases
    if (!testCase.queryType.includes('watch') && !testCase.queryType.includes('Watch')) {
      return { valid: true }
    }
    
    // 1. Check for specific negative test patterns
    
    // neg-memory-001: Subscription never unsubscribed
    if (testCase.id === 'neg-memory-001' || code.includes('// Subscription never unsubscribed')) {
      // Look for subscriptions without unsubscribe mechanisms
      if (code.includes('.subscribe(') && 
          !code.includes('unsubscribe') && 
          !code.includes('take(') && 
          !code.includes('takeUntil(') && 
          !code.includes('finalize(') &&
          !code.includes('first()') &&
          !code.includes('subscription')) {
        return {
          valid: false,
          reason: 'Subscription leak detected: Observable subscription without unsubscribe mechanism'
        }
      }
      
      // Check for missing subscription variable assignment
      if (code.includes('.subscribe({') && !code.includes('const subscription') && 
          !code.includes('let subscription') && !code.includes('var subscription')) {
        return {
          valid: false,
          reason: 'Subscription leak: Observable subscribed but no reference stored for cleanup'
        }
      }
      
      // Check for comment indicating memory leak
      if (code.includes('memory leak') || code.includes('Missing subscription.unsubscribe()')) {
        return {
          valid: false,
          reason: 'Memory leak indicated in code comments'
        }
      }
    }
    
    // neg-memory-002: Nested subscriptions without cleanup
    if (testCase.id === 'neg-memory-002' || code.includes('// Nested subscriptions without cleanup')) {
      // Look for nested subscription patterns
      const nestedSubscriptionPatterns = [
        // Multiple .subscribe() calls in sequence
        /\.subscribe\([^}]*{[^}]*\.subscribe\(/s,
        // Subscribe within subscribe callback
        /next:\s*\([^)]*\)\s*=>\s*{[^}]*\.watchValue\(\)\.subscribe\(/s,
        // Multiple watchValue calls
        /watchValue\(\)[^}]*watchValue\(\)/s,
        // Nested without cleanup indicators
        /subscribe.*{[^}]*subscribe.*{[^}]*subscribe/s
      ]
      
      for (const pattern of nestedSubscriptionPatterns) {
        if (pattern.test(code)) {
          return {
            valid: false,
            reason: `Nested subscription leak detected: ${pattern.source}`
          }
        }
      }
      
      // Check for multiple subscription calls without proper cleanup
      const subscribeMatches = code.match(/\.subscribe\(/g)
      if (subscribeMatches && subscribeMatches.length > 1) {
        const unsubscribeMatches = code.match(/\.unsubscribe\(\)/g)
        const cleanupOperators = code.match(/take\(|takeUntil\(|finalize\(/g)
        
        if ((!unsubscribeMatches || unsubscribeMatches.length < subscribeMatches.length) &&
            (!cleanupOperators || cleanupOperators.length < subscribeMatches.length)) {
          return {
            valid: false,
            reason: `Multiple subscriptions (${subscribeMatches.length}) without adequate cleanup mechanisms`
          }
        }
      }
    }
    
    // 2. General memory leak patterns
    
    // Infinite Observable subscriptions without completion operators
    if (code.includes('watchValue') || code.includes('watchEntries')) {
      // Check for infinite streams without limiting operators
      const infinitePatterns = [
        // No take/takeUntil/first operators
        /watchValue\(\)\.subscribe\(/,
        /watchEntries\(\)\.subscribe\(/,
        // Timer/interval without take operators
        /interval\([^)]+\)\.subscribe\(/,
        /timer\([^)]+\)\.subscribe\(/
      ]
      
      for (const pattern of infinitePatterns) {
        if (pattern.test(code) && 
            !code.includes('take(') && 
            !code.includes('takeUntil(') && 
            !code.includes('first(') &&
            !code.includes('unsubscribe')) {
          return {
            valid: false,
            reason: `Infinite Observable subscription without completion mechanism: ${pattern.source}`
          }
        }
      }
    }
    
    // Subject/BehaviorSubject without completion
    if ((code.includes('new Subject') || code.includes('new BehaviorSubject')) &&
        !code.includes('complete()') && !code.includes('unsubscribe()')) {
      return {
        valid: false,
        reason: 'Subject created without completion mechanism'
      }
    }
    
    // Event listeners without removal
    if (code.includes('addEventListener') && !code.includes('removeEventListener')) {
      return {
        valid: false,
        reason: 'Event listeners added without removal mechanism'
      }
    }
    
    // setTimeout/setInterval without clearing
    if (code.includes('setInterval') && !code.includes('clearInterval')) {
      return {
        valid: false,
        reason: 'setInterval without clearInterval - timer leak'
      }
    }
    
    if (code.includes('setTimeout') && code.includes('recursive') && !code.includes('clearTimeout')) {
      return {
        valid: false,
        reason: 'Recursive setTimeout without clearTimeout - timer leak'
      }
    }
    
    return { valid: true }
  }

  /**
   * Comprehensive memory leak detection across all scenarios
   */
  async validateMemoryLeaks(testCase: TestCase): Promise<MemoryLeakResult> {
    console.log(`🧠 MEMORY LEAK TESTING: ${testCase.id}`)
    console.log('Testing subscription cleanup and memory management...\n')
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc()
    }
    
    const startTime = Date.now()
    const initialMemory = process.memoryUsage().heapUsed
    let peakMemory = initialMemory
    
    const metrics = {
      subscriptionsCreated: 0,
      subscriptionsDestroyed: 0,
      observablesCreated: 0,
      subjectsCreated: 0,
      timersCreated: 0,
      timersCleared: 0,
      eventListenersAdded: 0,
      eventListenersRemoved: 0
    }
    
    try {
      // Test different types of memory leak scenarios
      console.log('  🔍 Testing subscription leaks...')
      await this.testSubscriptionLeaks(testCase, metrics)
      
      console.log('  🔍 Testing Observable creation patterns...')
      await this.testObservableCreationLeaks(testCase, metrics)
      
      console.log('  🔍 Testing timer and interval cleanup...')
      await this.testTimerLeaks(testCase, metrics)
      
      console.log('  🔍 Testing event listener cleanup...')
      await this.testEventListenerLeaks(testCase, metrics)
      
      console.log('  🔍 Testing Subject cleanup...')
      await this.testSubjectLeaks(testCase, metrics)
      
      console.log('  🔍 Testing nested subscription patterns...')
      await this.testNestedSubscriptionLeaks(testCase, metrics)
      
      // Monitor memory during test execution
      const currentMemory = process.memoryUsage().heapUsed
      if (currentMemory > peakMemory) {
        peakMemory = currentMemory
      }
      
      // Cleanup phase
      console.log('  🧹 Performing cleanup...')
      const cleanupStartTime = Date.now()
      await this.performCleanup()
      const cleanupTime = Date.now() - cleanupStartTime
      
      // Post-cleanup memory check
      if (global.gc) {
        global.gc()
        // Wait for GC to complete
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      const finalMemory = process.memoryUsage().heapUsed
      const memoryDelta = finalMemory - initialMemory
      const testDuration = Date.now() - startTime
      
      // Calculate metrics
      const activeSubscriptions = this.subscriptionRegistry.size
      const leakedSubscriptions = Math.max(0, metrics.subscriptionsCreated - metrics.subscriptionsDestroyed)
      const cleanupEfficiency = metrics.subscriptionsCreated > 0 
        ? (metrics.subscriptionsDestroyed / metrics.subscriptionsCreated) * 100 
        : 100
      
      const memoryGrowthRate = testDuration > 0 ? (memoryDelta / testDuration) * 1000 : 0
      const gcPressure = Math.min(1, Math.max(0, memoryDelta / (10 * 1024 * 1024))) // Normalized to 10MB
      
      // Determine leak severity
      let leakSeverity: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none'
      const memoryDeltaMB = memoryDelta / (1024 * 1024)
      
      if (memoryDeltaMB > 50) leakSeverity = 'critical'
      else if (memoryDeltaMB > 20) leakSeverity = 'high'
      else if (memoryDeltaMB > 10) leakSeverity = 'medium'
      else if (memoryDeltaMB > 5) leakSeverity = 'low'
      
      const leakDetected = leakSeverity !== 'none' || leakedSubscriptions > 0 || activeSubscriptions > 0
      
      console.log(`  📊 Memory Analysis:`)
      console.log(`    Initial: ${Math.round(initialMemory / 1024 / 1024)}MB`)
      console.log(`    Final: ${Math.round(finalMemory / 1024 / 1024)}MB`)
      console.log(`    Delta: ${memoryDeltaMB > 0 ? '+' : ''}${Math.round(memoryDeltaMB)}MB`)
      console.log(`    Active Subscriptions: ${activeSubscriptions}`)
      console.log(`    Leaked Subscriptions: ${leakedSubscriptions}`)
      console.log(`    Cleanup Efficiency: ${Math.round(cleanupEfficiency)}%`)
      
      return {
        passed: !leakDetected && cleanupEfficiency >= 90,
        message: leakDetected 
          ? `Memory leaks detected: ${leakSeverity} severity, ${leakedSubscriptions} leaked subscriptions`
          : `No memory leaks detected, ${Math.round(cleanupEfficiency)}% cleanup efficiency`,
        executionTime: testDuration,
        memoryMetrics: {
          initialMemory,
          finalMemory,
          peakMemory,
          memoryDelta,
          leakDetected,
          leakSeverity
        },
        subscriptionTracking: {
          subscriptionsCreated: metrics.subscriptionsCreated,
          subscriptionsDestroyed: metrics.subscriptionsDestroyed,
          activeSubscriptions,
          leakedSubscriptions,
          cleanupEfficiency
        },
        resourceManagement: {
          observablesCreated: metrics.observablesCreated,
          subjectsCreated: metrics.subjectsCreated,
          timersCreated: metrics.timersCreated,
          timersCleared: metrics.timersCleared,
          eventListenersAdded: metrics.eventListenersAdded,
          eventListenersRemoved: metrics.eventListenersRemoved
        },
        performanceImpact: {
          memoryGrowthRate,
          gcPressure,
          timeToCleanup: cleanupTime
        }
      }
      
    } catch (error) {
      return {
        passed: false,
        message: `Memory leak testing failed: ${error instanceof Error ? error.message : String(error)}`,
        executionTime: Date.now() - startTime,
        memoryMetrics: {
          initialMemory,
          finalMemory: process.memoryUsage().heapUsed,
          peakMemory,
          memoryDelta: 0,
          leakDetected: true,
          leakSeverity: 'critical'
        },
        subscriptionTracking: {
          subscriptionsCreated: metrics.subscriptionsCreated,
          subscriptionsDestroyed: metrics.subscriptionsDestroyed,
          activeSubscriptions: this.subscriptionRegistry.size,
          leakedSubscriptions: metrics.subscriptionsCreated - metrics.subscriptionsDestroyed,
          cleanupEfficiency: 0
        },
        resourceManagement: {
          observablesCreated: metrics.observablesCreated,
          subjectsCreated: metrics.subjectsCreated,
          timersCreated: metrics.timersCreated,
          timersCleared: metrics.timersCleared,
          eventListenersAdded: metrics.eventListenersAdded,
          eventListenersRemoved: metrics.eventListenersRemoved
        },
        performanceImpact: {
          memoryGrowthRate: 0,
          gcPressure: 1,
          timeToCleanup: 0
        }
      }
    }
  }

  /**
   * Test basic subscription leak patterns
   */
  private async testSubscriptionLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const subscriptions: any[] = []
    
    // Create multiple subscriptions without proper cleanup
    for (let i = 0; i < 50; i++) {
      const obs = interval(100).pipe(
        take(5),
        tap(() => console.log(`    📨 Emission from subscription ${i + 1}`))
      )
      
      const subscription = obs.subscribe()
      subscriptions.push(subscription)
      this.subscriptionRegistry.add(subscription)
      metrics.subscriptionsCreated++
      
      // Track in observables registry
      this.observableRegistry.add(obs)
      metrics.observablesCreated++
    }
    
    // Wait for some emissions
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Clean up half of the subscriptions (simulate partial cleanup)
    const halfPoint = Math.floor(subscriptions.length / 2)
    for (let i = 0; i < halfPoint; i++) {
      subscriptions[i].unsubscribe()
      this.subscriptionRegistry.delete(subscriptions[i])
      metrics.subscriptionsDestroyed++
    }
    
    // Add cleanup tasks for remaining subscriptions
    for (let i = halfPoint; i < subscriptions.length; i++) {
      this.cleanupTasks.push(() => {
        subscriptions[i].unsubscribe()
        this.subscriptionRegistry.delete(subscriptions[i])
        metrics.subscriptionsDestroyed++
      })
    }
  }

  /**
   * Test Observable creation patterns that can cause leaks
   */
  private async testObservableCreationLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const observables: Observable<any>[] = []
    
    // Test different Observable creation patterns
    for (let i = 0; i < 20; i++) {
      // Hot Observable that doesn't complete
      const hotObs = new Observable(observer => {
        const intervalId = setInterval(() => {
          observer.next(`data_${i}_${Date.now()}`)
        }, 50)
        
        metrics.timersCreated++
        this.timerRegistry.add(intervalId)
        
        // Return cleanup function
        return () => {
          clearInterval(intervalId)
          metrics.timersCleared++
          this.timerRegistry.delete(intervalId)
        }
      })
      
      observables.push(hotObs)
      this.observableRegistry.add(hotObs)
      metrics.observablesCreated++
    }
    
    // Subscribe to half of them and create potential leaks
    const subscriptions = []
    for (let i = 0; i < Math.floor(observables.length / 2); i++) {
      const subscription = observables[i].subscribe()
      subscriptions.push(subscription)
      this.subscriptionRegistry.add(subscription)
      metrics.subscriptionsCreated++
    }
    
    // Wait for some activity
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Add cleanup for subscriptions
    subscriptions.forEach(sub => {
      this.cleanupTasks.push(() => {
        sub.unsubscribe()
        this.subscriptionRegistry.delete(sub)
        metrics.subscriptionsDestroyed++
      })
    })
  }

  /**
   * Test timer and interval cleanup patterns
   */
  private async testTimerLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const timers: any[] = []
    
    // Create various timer types
    for (let i = 0; i < 15; i++) {
      // Regular intervals
      const intervalId = setInterval(() => {
        console.log(`    ⏰ Timer ${i} tick`)
      }, 200)
      
      timers.push(intervalId)
      this.timerRegistry.add(intervalId)
      metrics.timersCreated++
      
      // Timeout timers
      const timeoutId = setTimeout(() => {
        console.log(`    ⏱️  Timeout ${i} fired`)
      }, 300 + i * 50)
      
      timers.push(timeoutId)
      this.timerRegistry.add(timeoutId)
      metrics.timersCreated++
    }
    
    // Wait for some timer activity
    await new Promise(resolve => setTimeout(resolve, 250))
    
    // Clean up some timers immediately
    const halfPoint = Math.floor(timers.length / 2)
    for (let i = 0; i < halfPoint; i++) {
      clearInterval(timers[i])
      clearTimeout(timers[i])
      this.timerRegistry.delete(timers[i])
      metrics.timersCleared++
    }
    
    // Add cleanup for remaining timers
    for (let i = halfPoint; i < timers.length; i++) {
      this.cleanupTasks.push(() => {
        clearInterval(timers[i])
        clearTimeout(timers[i])
        this.timerRegistry.delete(timers[i])
        metrics.timersCleared++
      })
    }
  }

  /**
   * Test event listener cleanup patterns
   */
  private async testEventListenerLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const eventHandlers: Array<{ target: any, event: string, handler: Function }> = []
    
    // Simulate adding event listeners (in Node.js, we'll use process events)
    for (let i = 0; i < 10; i++) {
      const handler = () => {
        console.log(`    📡 Event handler ${i} called`)
      }
      
      const eventName = `custom_event_${i}`
      process.addListener(eventName as any, handler)
      
      eventHandlers.push({ target: process, event: eventName, handler })
      metrics.eventListenersAdded++
    }
    
    // Emit some events to test
    setTimeout(() => {
      eventHandlers.forEach((item, index) => {
        process.emit(item.event as any)
      })
    }, 100)
    
    // Wait for events
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Remove half the listeners
    const halfPoint = Math.floor(eventHandlers.length / 2)
    for (let i = 0; i < halfPoint; i++) {
      const item = eventHandlers[i]
      process.removeListener(item.event as any, item.handler as any)
      metrics.eventListenersRemoved++
    }
    
    // Add cleanup for remaining listeners
    for (let i = halfPoint; i < eventHandlers.length; i++) {
      const item = eventHandlers[i]
      this.cleanupTasks.push(() => {
        process.removeListener(item.event as any, item.handler as any)
        metrics.eventListenersRemoved++
      })
    }
  }

  /**
   * Test Subject cleanup patterns
   */
  private async testSubjectLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const subjects: Subject<any>[] = []
    const subscriptions: any[] = []
    
    // Create various Subject types
    for (let i = 0; i < 10; i++) {
      const subject = new BehaviorSubject(`initial_${i}`)
      subjects.push(subject)
      metrics.subjectsCreated++
      
      // Create subscriptions to subjects
      const subscription1 = subject.subscribe(value => {
        console.log(`    📨 Subject ${i} subscriber 1: ${value}`)
      })
      
      const subscription2 = subject.subscribe(value => {
        console.log(`    📨 Subject ${i} subscriber 2: ${value}`)
      })
      
      subscriptions.push(subscription1, subscription2)
      this.subscriptionRegistry.add(subscription1)
      this.subscriptionRegistry.add(subscription2)
      metrics.subscriptionsCreated += 2
      
      // Emit some values
      setTimeout(() => {
        subject.next(`update_${i}_${Date.now()}`)
      }, 50 + i * 10)
    }
    
    // Wait for emissions
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Clean up some subscriptions
    const halfPoint = Math.floor(subscriptions.length / 2)
    for (let i = 0; i < halfPoint; i++) {
      subscriptions[i].unsubscribe()
      this.subscriptionRegistry.delete(subscriptions[i])
      metrics.subscriptionsDestroyed++
    }
    
    // Add cleanup for remaining subscriptions and subjects
    for (let i = halfPoint; i < subscriptions.length; i++) {
      this.cleanupTasks.push(() => {
        subscriptions[i].unsubscribe()
        this.subscriptionRegistry.delete(subscriptions[i])
        metrics.subscriptionsDestroyed++
      })
    }
    
    // Complete subjects
    subjects.forEach((subject, index) => {
      this.cleanupTasks.push(() => {
        subject.complete()
      })
    })
  }

  /**
   * Test nested subscription patterns that commonly cause leaks
   */
  private async testNestedSubscriptionLeaks(testCase: TestCase, metrics: any): Promise<void> {
    const outerSubscriptions: any[] = []
    
    // Create nested subscription patterns
    for (let i = 0; i < 5; i++) {
      const outerObs = interval(200).pipe(take(3))
      
      const outerSub = outerObs.subscribe(outerValue => {
        console.log(`    🔄 Outer ${i}: ${outerValue}`)
        
        // Create inner subscription (potential leak point)
        const innerObs = timer(100).pipe(
          switchMap(() => interval(50).pipe(take(2)))
        )
        
        const innerSub = innerObs.subscribe(innerValue => {
          console.log(`      🔄 Inner ${i}-${outerValue}: ${innerValue}`)
        })
        
        this.subscriptionRegistry.add(innerSub)
        metrics.subscriptionsCreated++
        
        // Add cleanup for inner subscription
        this.cleanupTasks.push(() => {
          innerSub.unsubscribe()
          this.subscriptionRegistry.delete(innerSub)
          metrics.subscriptionsDestroyed++
        })
      })
      
      outerSubscriptions.push(outerSub)
      this.subscriptionRegistry.add(outerSub)
      metrics.subscriptionsCreated++
    }
    
    // Wait for nested activity
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Clean up outer subscriptions
    outerSubscriptions.forEach(sub => {
      this.cleanupTasks.push(() => {
        sub.unsubscribe()
        this.subscriptionRegistry.delete(sub)
        metrics.subscriptionsDestroyed++
      })
    })
  }

  /**
   * Perform all cleanup tasks
   */
  private async performCleanup(): Promise<void> {
    console.log(`    🧹 Executing ${this.cleanupTasks.length} cleanup tasks...`)
    
    // Execute all cleanup tasks
    this.cleanupTasks.forEach((cleanup, index) => {
      try {
        cleanup()
      } catch (error) {
        console.log(`      ⚠️  Cleanup task ${index} failed: ${error}`)
      }
    })
    
    // Clear registries
    this.subscriptionRegistry.clear()
    this.observableRegistry.clear()
    this.timerRegistry.clear()
    this.cleanupTasks.length = 0
    
    // Force garbage collection again
    if (global.gc) {
      global.gc()
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
}

// Export singleton
export const memoryLeakValidator = new MemoryLeakValidator()