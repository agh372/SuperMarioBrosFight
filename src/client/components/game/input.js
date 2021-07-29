import OtherPlayerKeyboardState from '../OtherPlayerKeyboardState.js';


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';

import Compositor from './Compositor.js';
import {createMario, createLuigi, createFire} from './entities';

import { loadBackgroundSprites} from './sprites.js';
import {createSpriteLayer, createBackgroundLayer} from './layers.js'
import Timer from './Timer.js';

import {Vec2} from './math.js'
import Entity from './Entity.js';

import Keyboard from './KeyboardState.js';
import Level from './Level.js';
import Camera from './Camera.js';

import {createCollisionLayer, createCameraLayer} from './layers.js';
import levels from './levels/1-1.json';

export function setupKeyboard(entity, level, context, camera) {
    var a = new Level();
    a = level;
    const input = new Keyboard();

    var c = new Camera();
    c = camera;


    input.addMapping('KeyP', keyState => {
       
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    // input.addMapping('KeyO', keyState => {
    //     entity.turbo(keyState);
    // });

    input.addMapping('KeyD', keyState => {
        entity.state  = -1;
        entity.go.dir = keyState ? 1 : 0;
    });

    input.addMapping('KeyA', keyState => {

        entity.state  = 1;
        entity.go.dir = keyState ? -1 : 0;
    });

    input.addMapping('KeyF', keyState => {
        if(entity.player == 0 && keyState == 1){

        Promise.all([
            createFire(entity.state)
        ])
        .then(([fire]) => {

           //fire.pos.set(78, 64);
           fire.pos.x = entity.pos.x + 15;
           fire.pos.y = entity.pos.y;

            a.entities.add(fire);

            fire.source = entity.name;


        });
    }

        //entity.go.dir += keyState ? 1 : -1;
    });

    return input;
}



export function setupVirtualKeyboard(entity, level, context, camera) {
    const input = new OtherPlayerKeyboardState();

    var a = new Level();
    a = level;

    var c = new Camera();
    c = camera;


    input.addMapping('KeyP', keyState => {
       
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    

    input.addMapping('KeyD', keyState => {
        entity.state  = -1;
        entity.go.dir = keyState ? 1 : 0;
    });

    input.addMapping('KeyA', keyState => {

        entity.state  = 1;
        entity.go.dir = keyState ? -1 : 0;
    });

    input.addMapping('KeyF', keyState => {
        if(entity.player == 1 && keyState == 1){
        Promise.all([
            createFire(entity.state)
        ])
        .then(([fire]) => {

            
           //fire.pos.set(78, 64);
           fire.pos.x = entity.pos.x + 15;
           fire.pos.y = entity.pos.y;
           a.addEntity(fire);

            a.entities.add(fire);

            fire.source = entity.name;



        });
    }

        //entity.go.dir += keyState ? 1 : -1;
    });

    return input;
}