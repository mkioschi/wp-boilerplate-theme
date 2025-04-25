<?php

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(handle: 'main-style', src: get_template_directory_uri() . '/assets/dist/css/main.min.css', ver: time());

    wp_enqueue_script(handle: 'main-script', src: get_template_directory_uri() . '/assets/dist/js/main.min.js', ver: time());
});
