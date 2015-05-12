module.exports = function(grunt) {
    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "node_modules/",
                        src: [
                            "jquery/dist/jquery.min.js",
                            "jquery/dist/jquery.min.map"
                        ],
                        "dest": "public/vendors"
                    },
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');

    //Default task(s)
    grunt.registerTask('default', ['copy']);
};