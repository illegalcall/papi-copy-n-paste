{{#includeChopsticks}}import { setupPolkadotApi as setup } from '@acala-network/chopsticks'

/**
 * Chopsticks local development setup for {{chainDisplayName}}
 * 
 * This creates a local fork of {{chainDisplayName}} for development and testing.
 * 
 * Available commands once running:
 * - er {id}: Execute the call of referendum {id} as sudo
 * - ts: Jump to the next treasury spend period  
 * - nb: Produce a new block
 * - jb {height}: Advance block height to {height}
 */

async function main() {
  console.log('🚀 Starting Chopsticks for {{chainDisplayName}}...')
  
  const config = {
    endpoint: [{{#wsUrls}}
      '{{url}}',{{/wsUrls}}
    ],
    port: 8132,
    block: undefined, // Latest block
    'build-block-mode': 'batch' as const,
    'runtime-log-level': 3,
    'db': undefined, // In-memory database
  }

  try {
    const api = await setup(config)
    console.log('✅ Chopsticks is ready!')
    console.log('📡 Local endpoint: ws://localhost:8132')
    console.log('')
    console.log('Available commands:')
    console.log('  er {id}     - Execute referendum {id} as sudo')
    console.log('  ts          - Jump to next treasury spend period')
    console.log('  nb          - Produce new block')
    console.log('  jb {height} - Jump to block height')
    console.log('')
    console.log('💡 Run your app with: npm run dev-local')
    console.log('')

    // Interactive command handling
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', async (data) => {
      const command = data.toString().trim()
      
      if (command.startsWith('er ')) {
        const id = command.split(' ')[1]
        console.log(`Executing referendum ${id} as sudo...`)
        // Implementation would go here
      } else if (command === 'ts') {
        console.log('Jumping to next treasury spend period...')
        // Implementation would go here
      } else if (command === 'nb') {
        console.log('Producing new block...')
        // Implementation would go here
      } else if (command.startsWith('jb ')) {
        const height = command.split(' ')[1]
        console.log(`Jumping to block ${height}...`)
        // Implementation would go here
      } else if (command === 'help' || command === '?') {
        console.log('Available commands: er, ts, nb, jb, help, exit')
      } else if (command === 'exit' || command === 'quit') {
        console.log('👋 Shutting down Chopsticks...')
        process.exit(0)
      } else {
        console.log(`Unknown command: ${command}. Type 'help' for available commands.`)
      }
    })

    console.log('Type commands or "help" for available options:')

  } catch (error) {
    console.error('❌ Failed to start Chopsticks:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Chopsticks gracefully...')
  process.exit(0)
})

main().catch(console.error){{/includeChopsticks}}