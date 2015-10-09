var paths = {
	build: 'app/build/',
	src: 'app/src/',
	assets: 'app/src/assets/',
	bower: 'app/src/bower_components/'
}

var scriptsList = {
	'app/build/scripts/combined.min.js': [
		paths.assets + 'scripts/custom/vimeo.js',
		paths.assets + 'scripts/custom/initialize.js',
	],
	'app/build/scripts/plugins.min.js': [
		paths.bower + 'jquery/dist/jquery.min.js',
		paths.bower + 'jquery_lazyload/jquery.lazyload.js',
		paths.assets + 'scripts/vendor/viewportchecker.js',
		paths.bower + 'jQuery.mmenu/dist/js/jquery.mmenu.min.js',
		paths.bower + 'jQuery.mmenu/dist/js/addons/jquery.mmenu.dragopen.min.js',
		paths.assets + 'scripts/vendor/jquery.bxslider.js'
	]
};

module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {

			files: paths.assets + 'scripts/custom/*.js',

			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		uglify: {

			development : {
				options: {
					//compress: true
				},
				files: scriptsList
			},

			release : {
				files: scriptsList
			}
		},

		sass: {

			development: {
				options: {
					style: 'compressed'
				},
				files: {
					'app/build/styles/styles.css': paths.assets + 'styles/styles.scss',
				}
			},

			release: {
				options: {
					style: 'compressed'
				},
				files: {
					'app/build/styles/styles.css': paths.assets + 'styles/styles.scss',
				}
			}
		},

		autoprefixer: {

			build: {
				expand: true,
				flatten: true,
				src: paths.build + 'styles/**/*.css',
				dest: paths.build + 'styles/'
			}
		},

		copy: {

			images: {
				files: [{
					expand: true,
					cwd: paths.assets + 'images',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: paths.build + 'images/'
				}]
			},

			media: {
				files: [{
					expand: true,
					cwd: paths.assets + 'media',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: paths.build + 'media/'
				}]
			},

			fonts: {
				files: [
					{
						expand: true,
						cwd: paths.assets + 'fonts',
						src: ['**/*.{eot,svg,ttf,woff,woff2,otf}'],
						dest: paths.build + 'fonts/'
					}
				]
			},

			videos: {
				files: [{
					expand: true,
					cwd: paths.assets + 'video',
					src: ['**/*'],
					dest: paths.build + 'video/'
				}]
			},

			pdf: {
				files: [{
					expand: true,
					cwd: paths.assets,
					src: ['**/*.pdf'],
					dest: paths.build + ''
				}]
			}
		},

		clean: {

			build: {
				src: [paths.build + '']
			}
		},

		assemble: {

			options: {
				prettify: {
					indent: 4
				},
				marked: {
					sanitize: false
				},
				production: true,
				layoutdir: paths.src + 'layouts',
				partials: [paths.src + 'partials/**/*.hbs']
			},

			development: {
				options: {
					data: 'app/config/development/*.json'
				},
				files: [
					{
						expand: true,
						cwd: paths.src + 'pages',
						src: ['**/*.hbs'],
						dest: paths.build + ''
					}
				]
			},

			release: {
				options: {
					data: 'app/config/release/*.json'
				},
				files: [
					{
						expand: true,
						cwd: paths.src + 'pages',
						src: ['**/*.hbs'],
						dest: paths.build + ''
					}
				]
			},
		},

		watch: {

			// Watch for markup changes
			markup: {
				files: '**/*.hbs',
				tasks: ['assemble:development'],
				options: {
					livereload: false,
					interrupt: true
				}
			},

			// Run SASS compliler when precompiled files are changed
			styles: {
				files: paths.assets + 'styles/**/*.scss',
				tasks: ['sass:development'],
				options: {
					livereload: false,
					spawn: false
				}
			},

			images: {
				files: [paths.assets + 'images/**/*.{png,jpg,gif}'],
				tasks: ['copy:images'],
				options: {
					livereload: false,
					interrupt: true
				}
			},

			media: {
				files: [paths.assets + 'media/**/*.{png,jpg,gif}'],
				tasks: ['copy:media'],
				options: {
					livereload: false,
					interrupt: true
				}
			},

			videos: {
				files: [paths.assets + 'video/**/*.{mp4,ogv,webm}'],
				tasks: ['copy:videos'],
				options: {
					livereload: false,
					interrupt: true
				}
			},

			scripts: {
				files: [paths.assets + 'scripts/**/*.js'],
				tasks: ['uglify:development'],
				options: {
					livereload: false,
					interrupt: true
				}
			},

		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-html-validation');

	// Register task(s) to run when 'grunt' command is executed
	grunt.registerTask('default', ['development']);

	// Register task(s) to run when 'grunt development' command is executed
	grunt.registerTask('development', [
		'jshint',
		'clean',
		'sass:development',
		'autoprefixer',
		'copy',
		'uglify:development',
		'assemble:development',
		'watch'
	]);

	// Register task(s) to run when 'grunt release' command is executed
	grunt.registerTask('release', [
		'clean',
		'sass:release',
		'autoprefixer',
		'copy',
		'uglify:release',
		'assemble:release'
	]);

};
