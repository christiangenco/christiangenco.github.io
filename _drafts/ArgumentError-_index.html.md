---
title: 
image: 
description: 
---

{{#content 'meta'}}
    {{{meta 'og:type' 'website'}}}
    {{{meta 'og:title' 'Christian Genco'}}}
    {{{meta 'description' "Blog and projects of an internet micropreneur, software engineer, mustachian, and stage actor."}}}
    {{{meta 'og:description' "Blog and projects of an internet micropreneur, software engineer, mustachian, and stage actor."}}}
    {{{meta 'og:url' 'http://christian.gen.co/'}}}
    {{{meta 'og:image' "http://i.imgur.com/q50cC8s.jpg"}}}
{{/content}}

<h1 style="vertical-align: bottom; margin-top: 50px">
    <a href="/about"><img src="http://i.imgur.com/bMwFJSp.png" class="img-rounded" width="128px" title="Christian Genco" style="display: inline; margin-right: 20px;" /></a>
    Christian Genco 
</h1>

<ul class="nav nav-pills">
    <li role="presentation">
        <a href="/about">about</a>
    </li> 
    <!--<li role="presentation">
        <a href="/projects">projects</a>
    </li>-->
    <li role="presentation">
        <a href="/speaking">speaking</a>
    </li>
    <li role="presentation">
        <a href="/contact">contact</a>
    </li>
</ul>

<hr>

{{#reverse_each_with_sort pages "published_js"}} 
    {{#if this.public}}
        <!--<pre>{{inspect this}}</pre>-->
        {{#if this.featured}}
            <div class="row">
                <div class="col-sm-6">
                    <a href="/{{this.slug}}" class="media-left pull-right">
                        <img src="{{imgur_large this.image_url}}" class="img-rounded img-responsive" />
                    </a>
                </div>
                
                <div class="col-sm-6"> 
                    <h3>
                        <a href="/{{this.slug}}">
                            {{this.name}}
                        </a>
                    </h3>
                    {{#if this.description}}
                        <p>{{this.description}} <a href="/{{this.slug}}">more...</a></p>
                    {{/if}}
                </div>
            </div>
            <hr>
        {{/if}}
    {{/if}}
{{/reverse_each_with_sort}}

{{#reverse_each_with_sort pages "published_js"}} 
    {{#if this.public}}
        <!--<pre>{{inspect this}}</pre>-->
        {{#if this.featured}}
        {{else}}
            <div class="media">
                <a href="/{{this.slug}}" class="media-left pull-left">
                    <img src="{{imgur_small this.image_url}}" class="img-rounded img-responsive" />
                </a>
                <div class="media-body"> 
                    <h4 class="media-heading">
                        <a href="/{{this.slug}}">
                            {{this.name}}
                        </a>
                    </h4>
                    {{#if this.description}}
                        <p>{{this.description}} <a href="/{{this.slug}}">more...</a></p>
                    {{/if}}
                </div>
            </div>
        {{/if}}
    {{/if}}
{{/reverse_each_with_sort}}
