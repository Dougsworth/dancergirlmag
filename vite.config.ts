import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Check if we're running the Sanity Studio
  const isSanity = process.env.VITE_SANITY === 'true';
  
  return {
    server: {
      host: "0.0.0.0",
      port: isSanity ? 3333 : 8080, 
      strictPort: true,
      hmr: {
        host: 'localhost',
        protocol: 'ws',
        port: isSanity ? 3333 : 8080
      },
      watch: {
        usePolling: true
      }
    },
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      exclude: [
        '@sanity/client',
        '@sanity/image-url',
        'sanity',
        'sanity:client',
        'sanity:server',
        'sanity:form-builder',
        'sanity:desk-tool',
        'sanity:vision',
        'sanity:router'
      ],
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@portabletext/react',
        '@sanity/client',
        '@sanity/image-url'
      ]
    },
    // Fix for HMR with Sanity
    hmr: {
      overlay: false
    },
    // Build configuration
    build: {
      outDir: isSanity ? 'dist/sanity' : 'dist',
      emptyOutDir: !isSanity,
      // Optimize build size
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // Better code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-slot', '@radix-ui/react-toast'],
            utils: ['clsx', 'tailwind-merge', 'date-fns', 'framer-motion'],
            sanity: ['@sanity/client', '@sanity/image-url', '@portabletext/react']
          },
          // Optimize chunk names for caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `js/${facadeModuleId}-[hash].js`;
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo: any) => {
            const extType = assetInfo.name?.split('.').pop() || 'asset';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `${extType}/[name]-[hash][extname]`;
          }
        }
      },
      // Enable source maps for debugging
      sourcemap: false,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // CSS code splitting
      cssCodeSplit: true
    },
  };
});
