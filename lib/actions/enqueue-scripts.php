<?php

function enqueue_global_scripts()
{
    wp_enqueue_style(handle: 'global-style', src: asset_style('global.min.css'), ver: time());
    wp_enqueue_script(handle: 'global-script', src: asset_script('global.min.js'), deps: ['jquery'], ver: time());
}

function enqueue_pages_scripts()
{
    if (is_home()) {
        wp_enqueue_style(handle: 'home-page-style', src: asset_style('pages/home.min.css'), deps: ['global-style'], ver: time());
        wp_enqueue_script(handle: 'home-page-script', src: asset_script('pages/home.min.js'), deps: ['global-script'], ver: time());
    }
}

add_action('wp_enqueue_scripts', 'enqueue_global_scripts', 10);
add_action('wp_enqueue_scripts', 'enqueue_pages_scripts', 20);
