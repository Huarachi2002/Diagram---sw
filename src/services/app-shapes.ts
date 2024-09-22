/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

 2024-09-18 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import * as joint from '@joint/plus';
import { dia, shapes, util } from '@joint/plus';
import { ColumnData } from './interfaces';
const cache = new Map();


// export namespace app {

    export class Table extends shapes.standard.HeaderedRecord {
        defaults() {
            return util.defaultsDeep({
                type: 'Table',
                columns: [],
                padding: { top: 40, bottom: 10, left: 10, right: 10 },
                size: { width: 260 },
                itemMinLabelWidth: 80,
                itemHeight: 25,
                itemOffset: 0,
                itemOverflow: true,
                attrs: {
                    root: {
                        magnet: false
                    },
                    body: {
                        stroke: '#FFF',
                        fill: '#FFF',
                        strokeWidth: 1
                    },
                    tabColor: {
                        x: -1,
                        y: -5,
                        width: 'calc(w+2)',
                        height: 5,
                        stroke: 'none',
                        fill: '#6C6C6C',
                        strokeWidth: 1
                    },
                    header: {
                        fill: '#F8FAFC',
                        stroke: '#F8FAFC',
                        strokeWidth: 1,
                    },
                    headerLabel: {
                        fill: '#636363',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        textWrap: {
                            ellipsis: true,
                            height: 30
                        }
                    },
                    itemBodies_0: {
                        // SVGRect which is an active magnet
                        // Do not use `true` to prevent CSS effects on hover
                        magnet: 'item'
                    },
                    group_1: {
                        // let the pointer events propagate to the group_0
                        // which spans over 2 columns
                        pointerEvents: 'none'
                    },
                    itemLabels: {
                        fontFamily: 'sans-serif',
                        fill: '#636363',
                        pointerEvents: 'none'
                    },
                    itemLabels_1: {
                        fill: '#9C9C9C',
                        textAnchor: 'end',
                        x: 'calc(0.5 * w - 10)'
                    },
                    itemLabels_keys: {
                        x: 'calc(0.5 * w - 30)'
                    },
                    iconsGroup_1: {
                        // SVGGroup does not accept `x` attribute
                        refX: '50%',
                        refX2: -26
                    }
                }
            }, super.defaults);
        }
    
        preinitialize(): void {
            this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'rect',
                selector: 'header'
            }, {
                tagName: 'rect',
                selector: 'tabColor'
            }, {
                tagName: 'text',
                selector: 'headerLabel'
            }];
        }
    
        initialize(...args: any[]) {
            super.initialize(...args);
            this.on('change', () => this.onColumnsChange());
            this._setColumns(this.get('columns'));
        }
    
        onColumnsChange() {
            if (this.hasChanged('columns')) {
                this._setColumns(this.get('columns'));
            }
        }
    
        setName(name: string, opt?: object) {
            return this.attr(['headerLabel', 'text'], name, opt);
        }
    
        getName(): string {
            return this.attr(['headerLabel', 'text']);
        }
    
        setTabColor(color: string) {
            return this.attr(['tabColor', 'fill'], color);
        }
    
        getTabColor(): string {
            return this.attr(['tabColor', 'fill']);
        }
    
        setColumns(data: Array<ColumnData>) {
            this.set('columns', data);
            return this;
        }
    
        toJSON() {
            const json = super.toJSON();
            // keeping only the `columns` attribute
            delete json.items;
            return json;
        }
    
        protected _setColumns(data: Array<ColumnData> = []) {
            const names: Array<object> = [];
            const values: Array<object> = [];
    
            data.forEach((item, i) => {
    
                if (!item.name) return;
    
                names.push({
                    id: item.name,
                    label: item.name,
                    span: 2
                });
    
                const value = {
                    id: `${item.type}_${i}`,
                    label: item.type
                };
                if (item.key) {
                    Object.assign(value, {
                        group: 'keys',
                        icon: 'assets/key.svg'
                    });
                }
                values.push(value);
            });
    
            this.set('items', [names, values]);
            this.removeInvalidLinks();
    
            return this;
        }
    }

    export class UMLClass extends joint.shapes.standard.Rectangle {

        portLabelMarkup = [{
            tagName: 'text',
            selector: 'portLabel'
        }];

        defaults() {

            return joint.util.defaultsDeep({
                type: 'UMLClass',  // Define el tipo
                allowOrthogonalResize: false,  // No permitir el redimensionamiento ortogonal
                size: { width: 100, height: 70 },  // Ajusta el tamaño según sea necesario
                attrs: {
                    root: {
                        dataTooltip: 'Class with ports',  // Tooltip para mostrar información
                        dataTooltipPosition: 'left',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    body: {  // Definir el estilo del cuerpo
                        fill: 'transparent',
                        stroke: '#31d0c6',
                        strokeWidth: 2,
                        strokeDasharray: '0',
                    },
                    label: {  // Definir el texto del nombre de la clase
                        text: 'ClassName',
                        fill: '#c6c7e2',
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 11,
                        strokeWidth: 0
                    },
                    '.attributes': {  // Definir los atributos de la clase
                        text: '+ attribute1: String\n+ attribute2: Integer',
                        fill: '#c6c7e2',
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        strokeWidth: 0
                    },
                    '.methods': {  // Definir los métodos de la clase
                        text: '+ method1(): void\n+ method2(param: String): String',
                        fill: '#c6c7e2',
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        strokeWidth: 0
                    }
                },
                ports: {  // Definir los puertos de entrada y salida
                    items: [
                        { group: 'in' },
                        { group: 'in' },
                        { group: 'out' }
                    ],
                    groups: {
                        'in': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 5,
                                    'fill': '#61549c'
                                }
                            }],
                            attrs: {
                                portBody: {
                                    magnet: true
                                }
                            },
                            position: {
                                name: 'top',
                            }
                        },
                        'out': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 5,
                                    'fill': '#31d0c6'
                                }
                            }],
                            attrs: {
                                portBody: {
                                    magnet: true
                                }
                            },
                            position: {
                                name: 'bottom',
                            }
                        }
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }

    export class Link extends dia.Link {
        defaults() {
            return {
                ...super.defaults,
                type: 'Link',
                z: -1,
                attrs: {
                    wrapper: {
                        connection: true,
                        strokeWidth: 10
                    },
                    line: {
                        connection: true,
                        stroke: '#A0A0A0',
                        strokeWidth: 2
                    }
                }
            }
        }
        markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }]

        static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
            const opt: any = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        getMarkerWidth(type: any) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d: any) {
            return this.getDataWidthCached(d);
        }

        private getDataWidthCached = function(d: string){
            if (cache.has(d)) {
                return cache.get(d);
            } else {
                const bbox = (new joint.g.Path(d)).bbox();
                cache.set(d, bbox ? bbox.width : 0);
                return cache.get(d);
            }
        };
    }

    export class LinkStencilHerencia extends joint.shapes.standard.Rectangle {
        defaults() {
            return joint.util.defaultsDeep({
                type: 'LinkStencilHerencia',
                size: { width: 50, height: 10 },
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#000000',
                        strokeWidth: 2
                    },
                    label: {
                        text: 'Link',
                        fill: '#000000',
                        fontSize: 10,
                        fontWeight: 'normal'
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }
    
    export class LinkStencilAgregacion extends joint.shapes.standard.Rectangle {
        defaults() {
            return joint.util.defaultsDeep({
                type: 'LinkStencilAgregacion',
                size: { width: 50, height: 10 },
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#000000',
                        strokeWidth: 2
                    },
                    label: {
                        text: 'Link',
                        fill: '#000000',
                        fontSize: 10,
                        fontWeight: 'normal'
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }

    export class LinkStencilComposicion extends joint.shapes.standard.Rectangle {
        defaults() {
            return joint.util.defaultsDeep({
                type: 'LinkStencilComposicion',
                size: { width: 50, height: 10 },
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#000000',
                        strokeWidth: 2
                    },
                    label: {
                        text: 'Link',
                        fill: '#000000',
                        fontSize: 10,
                        fontWeight: 'normal'
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }
    export class LinkStencilDependencia extends joint.shapes.standard.Rectangle {
        defaults() {
            return joint.util.defaultsDeep({
                type: 'LinkStencilDependencia',
                size: { width: 50, height: 10 },
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#000000',
                        strokeWidth: 2
                    },
                    label: {
                        text: 'Link',
                        fill: '#000000',
                        fontSize: 10,
                        fontWeight: 'normal'
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }

    export class Herencia extends dia.Link {
        defaults() {
            return {
                ...super.defaults,
                type: 'Herencia',
                size: {width: 100, height:30},
                // z: -1,
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#A0A0A0',
                        strokeWidth: 2
                    },
                    wrapper: {
                        connection: true,
                        strokeWidth: 10
                    },
                    line: {
                        connection: true,
                        stroke: '#A0A0A0',
                        strokeWidth: 2,
                        targetMarker: {
                            type: 'path',
                            d: 'M 20 -10 0 0 20 10 Z', // Flecha para generalización
                            fill: 'white',
                            stroke: '#A0A0A0',
                        }
                    }

                }
            }
        }
        markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }]

        static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
            const opt: any = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        getMarkerWidth(type: any) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d: any) {
            return this.getDataWidthCached(d);
        }

        private getDataWidthCached = function(d: string){
            if (cache.has(d)) {
                return cache.get(d);
            } else {
                const bbox = (new joint.g.Path(d)).bbox();
                cache.set(d, bbox ? bbox.width : 0);
                return cache.get(d);
            }
        };
    }
    
    export class Agregacion extends dia.Link {
        defaults() {
            return {
                ...super.defaults,
                type: 'Agregacion',
                size: {width: 100, height:30},
                // z: -1,
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#A0A0A0',
                        strokeWidth: 2
                    },
                    wrapper: {
                        connection: true,
                        strokeWidth: 10
                    },
                    line: {
                        connection: true,
                        stroke: '#A0A0A0',
                        strokeWidth: 2,
                        targetMarker: {
                            type: 'path',
                            d: 'M 20 0 L 10 -10 L 0 0 L 10 10 Z', // Rombo vacío para agregación
                            fill: 'white', // Vacío
                            stroke: '#A0A0A0'
                        }
                    }                    
                }
            }
        }
        markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }]

        static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
            const opt: any = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        getMarkerWidth(type: any) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d: any) {
            return this.getDataWidthCached(d);
        }

        private getDataWidthCached = function(d: string){
            if (cache.has(d)) {
                return cache.get(d);
            } else {
                const bbox = (new joint.g.Path(d)).bbox();
                cache.set(d, bbox ? bbox.width : 0);
                return cache.get(d);
            }
        };
    }
    
    export class Composicion extends dia.Link {
        defaults() {
            return {
                ...super.defaults,
                type: 'Composicion',
                size: {width: 100, height:30},
                // z: -1,
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#A0A0A0',
                        strokeWidth: 2
                    },
                    wrapper: {
                        connection: true,
                        strokeWidth: 10
                    },
                    line: {
                        connection: true,
                        stroke: '#A0A0A0',
                        strokeWidth: 2,
                        targetMarker: {
                            type: 'path',
                            d: 'M 20 0 L 10 -10 L 0 0 L 10 10 Z', // Rombo lleno para composición
                            fill: '#A0A0A0', // Lleno
                            stroke: '#A0A0A0'
                        }
                    }
                }
            }
        }
        markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }]

        static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
            const opt: any = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        getMarkerWidth(type: any) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d: any) {
            return this.getDataWidthCached(d);
        }

        private getDataWidthCached = function(d: string){
            if (cache.has(d)) {
                return cache.get(d);
            } else {
                const bbox = (new joint.g.Path(d)).bbox();
                cache.set(d, bbox ? bbox.width : 0);
                return cache.get(d);
            }
        };
    }

    export class Dependencia extends dia.Link {
        defaults() {
            return {
                ...super.defaults,
                type: 'Dependencia',
                size: {width: 100, height:30},
                // z: -1,
                attrs: {
                    body: {
                        fill: 'none',
                        stroke: '#A0A0A0',
                        strokeWidth: 2
                    },
                    wrapper: {
                        connection: true,
                        strokeWidth: 10
                    },
                    line: {
                        connection: true,
                        stroke: '#A0A0A0',
                        strokeWidth: 2,
                        strokeDasharray: '5, 5', // Línea punteada
                        targetMarker: {
                            type: 'path',
                            d: 'M 20 -10 L 0 0 L 20 10', // Flecha abierta para dependencia
                            fill: 'none', // Flecha abierta
                            stroke: '#A0A0A0'
                        }
                    }
                    
                }
            }
        }
        markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }]

        static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
            const opt: any = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        getMarkerWidth(type: any) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d: any) {
            return this.getDataWidthCached(d);
        }

        private getDataWidthCached = function(d: string){
            if (cache.has(d)) {
                return cache.get(d);
            } else {
                const bbox = (new joint.g.Path(d)).bbox();
                cache.set(d, bbox ? bbox.width : 0);
                return cache.get(d);
            }
        };
    }
    
    // export class Dependency extends dia.Link {
    //     defaults() {
    //         return joint.util.defaultsDeep({
    //             type: 'Dependency',
    //             attrs: {
    //                 line: {
    //                     stroke: '#000000',
    //                     strokeDasharray: '5, 2',  // Línea punteada para dependencia
    //                     strokeWidth: 2,
    //                     targetMarker: {
    //                         type: 'path',
    //                         d: 'M 10 0 L 0 -5 L 0 5 Z',  // Flecha abierta para dependencia
    //                         fill: 'none',
    //                         stroke: '#000000',
    //                     }
    //                 }
    //             }
    //         }, dia.Link.prototype.defaults);
    //     }
    // }
    
    // export class Association extends dia.Link {
    //     defaults() {
    //         return joint.util.defaultsDeep({
    //             type: 'Association',
    //             attrs: {
    //                 line: {
    //                     stroke: '#000000',
    //                     strokeWidth: 2,
    //                     targetMarker: {
    //                         type: 'none'  // Línea simple para asociación
    //                     }
    //                 }
    //             }
    //         }, dia.Link.prototype.defaults);
    //     }
    // }
    




    // export class CircularModel extends joint.shapes.standard.Ellipse {

    //     portLabelMarkup = [{
    //         tagName: 'text',
    //         selector: 'portLabel'
    //     }];

    //     defaults() {

    //         return joint.util.defaultsDeep({
    //             type: 'CircularModel',
    //             attrs: {
    //                 root: {
    //                     magnet: false
    //                 }
    //             },
    //             ports: {
    //                 groups: {
    //                     'in': {
    //                         markup: [{
    //                             tagName: 'circle',
    //                             selector: 'portBody',
    //                             attributes: {
    //                                 'r': 10
    //                             }
    //                         }],
    //                         attrs: {
    //                             portBody: {
    //                                 magnet: true,
    //                                 fill: '#61549c',
    //                                 strokeWidth: 0
    //                             },
    //                             portLabel: {
    //                                 fontSize: 11,
    //                                 fill: '#61549c',
    //                                 fontWeight: 800
    //                             }
    //                         },
    //                         position: {
    //                             name: 'ellipse',
    //                             args: {
    //                                 startAngle: 0,
    //                                 step: 30
    //                             }
    //                         },
    //                         label: {
    //                             position: {
    //                                 name: 'radial',
    //                                 args: null
    //                             }
    //                         }
    //                     },
    //                     'out': {
    //                         markup: [{
    //                             tagName: 'circle',
    //                             selector: 'portBody',
    //                             attributes: {
    //                                 'r': 10
    //                             }
    //                         }],
    //                         attrs: {
    //                             portBody: {
    //                                 magnet: true,
    //                                 fill: '#61549c',
    //                                 strokeWidth: 0
    //                             },
    //                             portLabel: {
    //                                 fontSize: 11,
    //                                 fill: '#61549c',
    //                                 fontWeight: 800
    //                             }
    //                         },
    //                         position: {
    //                             name: 'ellipse',
    //                             args: {
    //                                 startAngle: 180,
    //                                 step: 30
    //                             }
    //                         },
    //                         label: {
    //                             position: {
    //                                 name: 'radial',
    //                                 args: null
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }, joint.shapes.standard.Ellipse.prototype.defaults);
    //     }
    // }

    // export class RectangularModel extends joint.shapes.standard.Rectangle {

    //     portLabelMarkup = [{
    //         tagName: 'text',
    //         selector: 'portLabel'
    //     }];

    //     defaults() {

    //         return joint.util.defaultsDeep({
    //             type: 'RectangularModel',
    //             attrs: {
    //                 root: { 
    //                     magnet: false
    //                 }
    //             },
    //             ports: {
    //                 groups: {
    //                     'in': {
    //                         markup: [{
    //                             tagName: 'circle',
    //                             selector: 'portBody',
    //                             attributes: {
    //                                 'r': 10
    //                             }
    //                         }],
    //                         attrs: {
    //                             portBody: {
    //                                 magnet: true,
    //                                 fill: '#61549c',
    //                                 strokeWidth: 0
    //                             },
    //                             portLabel: {
    //                                 fontSize: 11,
    //                                 fill: '#61549c',
    //                                 fontWeight: 800
    //                             }
    //                         },
    //                         position: {
    //                             name: 'left'
    //                         },
    //                         label: {
    //                             position: {
    //                                 name: 'left',
    //                                 args: {
    //                                     y: 0
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     'out': {
    //                         markup: [{
    //                             tagName: 'circle',
    //                             selector: 'portBody',
    //                             attributes: {
    //                                 'r': 10
    //                             }
    //                         }],
    //                         position: {
    //                             name: 'right'
    //                         },
    //                         attrs: {
    //                             portBody: {
    //                                 magnet: true,
    //                                 fill: '#61549c',
    //                                 strokeWidth: 0
    //                             },
    //                             portLabel: {
    //                                 fontSize: 11,
    //                                 fill: '#61549c',
    //                                 fontWeight: 800
    //                             }
    //                         },
    //                         label: {
    //                             position: {
    //                                 name: 'right',
    //                                 args: {
    //                                     y: 0
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }, joint.shapes.standard.Rectangle.prototype.defaults);
    //     }
    // }

    // export class Link extends joint.shapes.standard.Link {

    //     defaultLabel = {
    //         attrs: {
    //             rect: {
    //                 fill: '#ffffff',
    //                 stroke: '#8f8f8f',
    //                 strokeWidth: 1,
    //                 width: 'calc(w + 10)',
    //                 height: 'calc(h + 10)',
    //                 x: 'calc(x - 5)',
    //                 y: 'calc(y - 5)'
    //             }
    //         }
    //     };

    //     private getDataWidthCached = function(d: string){
    //         if (cache.has(d)) {
    //             return cache.get(d);
    //         } else {
    //             const bbox = (new joint.g.Path(d)).bbox();
    //             cache.set(d, bbox ? bbox.width : 0);
    //             return cache.get(d);
    //         }
    //     };

    //     static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
    //         const link = linkView.model;
    //         const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
    //         const opt: any = { offset: markerWidth, stroke: true };
    //         // connection point for UML shapes lies on the root group containing all the shapes components
    //         const modelType = view.model.get('type');
    //         // taking the border stroke-width into account
    //         if (modelType === 'standard.InscribedImage') { opt.selector = 'border'; }
    //         return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    //     }

    //     defaults() {
    //         return joint.util.defaultsDeep({
    //             type: 'Link',
    //             router: {
    //                 name: 'normal'
    //             },
    //             connector: {
    //                 name: 'rounded'
    //             },
    //             labels: [],
    //             attrs: {
    //                 line: {
    //                     stroke: '#8f8f8f',
    //                     strokeDasharray: '0',
    //                     strokeWidth: 2,
    //                     fill: 'none',
    //                     sourceMarker: {
    //                         type: 'path',
    //                         d: 'M 0 0 0 0',
    //                         stroke: 'none'
    //                     },
    //                     targetMarker: {
    //                         type: 'path',
    //                         d: 'M 0 -5 -10 0 0 5 z',
    //                         stroke: 'none'
    //                     }
    //                 }
    //             }
    //         }, joint.shapes.standard.Link.prototype.defaults);
    //     }

    //     getMarkerWidth(type: any) {
    //         const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
    //         return this.getDataWidth(d);
    //     }

    //     getDataWidth(d: any) {
    //         return this.getDataWidthCached(d);
    //     }
    // }

    const TableView = shapes.standard.RecordView;

    Object.assign(shapes, {
        app: {
            Table,
            TableView,
            Link,
            Herencia,
            // Agregacion,
            // Association,
            // Composition,
            // Dependency,
        }
    });
// }

export const NavigatorElementView = joint.dia.ElementView.extend({

    body: null,

    markup: [{
        tagName: 'rect',
        selector: 'body',
        attributes: {
            'fill': '#31d0c6'
        }
    }],

    initFlag: ['RENDER', 'UPDATE', 'TRANSFORM'],

    presentationAttributes: {
        size: ['UPDATE'],
        position: ['TRANSFORM'],
        angle: ['TRANSFORM']
    },

    confirmUpdate: function(flags: number) {

        if (this.hasFlag(flags, 'RENDER')) { this.render(); }
        if (this.hasFlag(flags, 'UPDATE')) { this.update(); }
        if (this.hasFlag(flags, 'TRANSFORM')) { this.updateTransformation(); }
    },

    render: function() {
        const { fragment, selectors: { body }} = joint.util.parseDOMJSON(this.markup);
        this.body = body;
        this.el.appendChild(fragment);
    },

    update: function() {
        const { model, body } = this;
        const { width, height } = model.size();
        body.setAttribute('width', width);
        body.setAttribute('height', height);
    }
});


export const NavigatorLinkView = joint.dia.LinkView.extend({

    defaultTheme: null,

    initialize: function(options: any) {
        joint.mvc.View.prototype.initialize.call(this, options);
    },

    onMount: joint.util.noop,

    render: joint.util.noop,

    update: joint.util.noop
});

// re-export build-in shapes from rappid
export const standard = joint.shapes.standard;

