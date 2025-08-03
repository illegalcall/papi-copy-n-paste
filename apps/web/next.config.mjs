import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  webpack: (config) => {
    // Add alias for PAPI descriptors
    config.resolve.alias = {
      ...config.resolve.alias,
      '@polkadot-api/descriptors': path.resolve('../../.papi/descriptors/dist/index.mjs')
    };
    
    // Make sure webpack can handle .mjs files properly
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js']
    };
    
    return config;
  },
}

export default nextConfig
