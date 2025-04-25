<?php

function asset(string $path)
{
    return get_template_directory_uri() . '/assets/dist/' . $path;
}

function asset_img(string $path)
{
    return get_template_directory_uri() . '/assets/dist/img/' . $path;
}

function asset_style(string $path)
{
    return get_template_directory_uri() . '/assets/dist/css/' . $path;
}

function asset_script(string $path)
{
    return get_template_directory_uri() . '/assets/dist/js/' . $path;
}
