// Quick test of parameter detection
const { dynamicStorageDetector } = require('./apps/web/utils/dynamicStorageDetection.ts');

console.log('Testing XYK.TotalLiquidity detection:');
try {
  const result = dynamicStorageDetector.detectParameters('hydration', 'XYK', 'TotalLiquidity');
  console.log('Result:', result);
  console.log('Required params:', result.required);
  console.log('Length:', result.required.length);
} catch (error) {
  console.error('Error:', error.message);
}