module.exports = (grunt) => {
    grunt.initConfig({
        ts: {
            default: {
                outDir: 'dist/',
                tsconfig: './tsconfig.json',
                src: ['src/**/*.ts'],
            },

            options: {
                declaration: false,
                rootDir: 'src',
                sourceMap: false,
            }
        }
    })
    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask("default", ["ts"])
}