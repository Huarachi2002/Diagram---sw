    import { ui, dia } from '@joint/plus';
    import * as appShapes from './app-shapes';  

    export class StencilService {

        stencil: ui.Stencil;

        create(paperScroller: ui.PaperScroller, snaplines: ui.Snaplines) {

            this.stencil = new ui.Stencil({
                paper: paperScroller,
                snaplines: snaplines,
                width: 240,
                groups: this.getStencilGroups(),
                dropAnimation: true,
                groupsToggleButtons: true,
                paperOptions: function() {
                    return {
                        model: new dia.Graph({}, {
                            cellNamespace: appShapes
                        }),
                        cellViewNamespace: appShapes
                    };
                },
                search: {
                    '*': ['type', 'attrs/root/dataTooltip', 'attrs/label/text']
                },
                layout: {
                    columns: 2,
                    marginX: 10,
                    marginY: 10,
                    columnGap: 10,
                    columnWidth: 100,
                    rowHeight: 80,
                },
                // Remove tooltip definition from clone
                dragStartClone: (cell: dia.Cell) => cell.clone().removeAttr('root/dataTooltip')
            });
        }

        setShapes() {
            this.stencil.load(this.getStencilShapes());
        }

        getStencilGroups() {
            return <{ [key: string]: ui.Stencil.Group }>{
                uml: { index: 1, label: 'UML Diagrams' }  // Añade el grupo UML
                // standard: { index: 1, label: 'Standard shapes' },
            };
        }

        getStencilShapes() {
            return {
                // standard: [
                //     {
                //         type: 'standard.Ellipse',
                //         size: { width: 90, height: 54 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Ellipse',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             label: {
                //                 text: 'ellipse',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         }
                //     },
                //     {
                //         type: 'RectangularModel',
                //         size: { width: 90, height: 67.5 },
                //         allowOrthogonalResize: false,
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Rectangle with ports',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 rx: 2,
                //                 ry: 2,
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             label: {
                //                 text: 'rect',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         },
                //         ports: {
                //             items: [
                //                 { group: 'in' },
                //                 { group: 'in' },
                //                 { group: 'out' }
                //             ]
                //         }
                //     },
                //     {
                //         type: 'CircularModel',
                //         size: { width: 90, height: 54 },
                //         allowOrthogonalResize: false,
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Ellipse with ports',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0',
                //             },
                //             label: {
                //                 text: 'ellipse',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         },
                //         ports: {
                //             items: [
                //                 { group: 'in' },
                //                 { group: 'in' },
                //                 { group: 'out' }
                //             ]
                //         }
                //     },
                //     {
                //         type: 'standard.Polygon',
                //         size: { width: 90, height: 54 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Rhombus',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 points: 'calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)',
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             label: {
                //                 text: 'rhombus',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         }
                //     },
                //     {
                //         type: 'standard.Cylinder',
                //         size: { width: 90, height: 54 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Cylinder',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             top: {
                //                 fill: '#31d0c6',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             label: {
                //                 text: 'cylinder',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         }
                //     },
                //     {
                //         type: 'standard.Image',
                //         size: { width: 90, height: 71 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Image',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             image: {
                //                 xlinkHref: 'assets/image-icon1.svg'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             label: {
                //                 text: 'image',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 fill: '#c6c7e2'
                //             }
                //         }
                //     },
                //     {
                //         type: 'standard.EmbeddedImage',
                //         size: { width: 90, height: 54 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Card',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             image: {
                //                 xlinkHref: 'assets/image-icon1.svg'
                //             },
                //             label: {
                //                 text: 'card',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         }
                //     },
                //     {
                //         type: 'standard.InscribedImage',
                //         size: { width: 60, height: 60 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Icon',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             border: {
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 3,
                //                 strokeDasharray: '0'
                //             },
                //             background: {
                //                 fill: 'transparent'
                //             },
                //             image: {
                //                 xlinkHref: 'assets/image-icon1.svg'
                //             },
                //             label: {
                //                 text: 'icon',
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0
                //             }
                //         }
                //     },
                //     {
                //         type: 'standard.HeaderedRectangle',
                //         size: { width: 90, height: 54 },
                //         attrs: {
                //             root: {
                //                 dataTooltip: 'Rectangle with header',
                //                 dataTooltipPosition: 'left',
                //                 dataTooltipPositionSelector: '.joint-stencil'
                //             },
                //             body: {
                //                 fill: 'transparent',
                //                 stroke: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0'
                //             },
                //             header: {
                //                 stroke: '#31d0c6',
                //                 fill: '#31d0c6',
                //                 strokeWidth: 2,
                //                 strokeDasharray: '0',
                //                 height: 20
                //             },
                //             bodyText: {
                //                 textWrap: {
                //                     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie.',
                //                     width: -10,
                //                     height: -20,
                //                     ellipsis: true
                //                 },
                //                 fill: '#c6c7e2',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0,
                //                 y: 'calc(h/2 + 10)',
                //             },
                //             headerText: {
                //                 text: 'header',
                //                 fill: '#f6f6f6',
                //                 fontFamily: 'Roboto Condensed',
                //                 fontWeight: 'Normal',
                //                 fontSize: 11,
                //                 strokeWidth: 0,
                //                 y: 10
                //             }
                //         }
                //     }
                // ],
                uml: [
                    {
                        type: 'Table',
                        columns: [{ name: 'id', type: 'int', key: true }] as any[],
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
                    },
                    {
                        type: 'Generalization',
                        attrs: {
                            line: {
                                stroke: '#000000',
                                targetMarker: {
                                    'type': 'path',
                                    'd': 'M 10 -5 0 0 10 5 z',
                                    'fill': '#000000',
                                    'stroke': '#000000'
                                }
                            }
                        }
                    },
                    {
                        type: 'Association',
                        attrs: {
                            line: {
                                stroke: '#000000',
                                targetMarker: {
                                    'type': 'path',
                                    'd': 'M 10 -5 0 0 10 5 z',
                                    'fill': '#000000',
                                    'stroke': '#000000'
                                }
                            }
                        }
                    },
                    {
                        type: 'Aggregation',
                        attrs: {
                            line: {
                                stroke: '#000000',
                                targetMarker: {
                                    'type': 'path',
                                    'd': 'M 10 -5 0 0 10 5 z',
                                    'fill': '#000000',
                                    'stroke': '#000000'
                                }
                            }
                        }
                    },
                    {
                        type: 'Composition',
                        attrs: {
                            line: {
                                stroke: '#000000',
                                targetMarker: {
                                    'type': 'path',
                                    'd': 'M 10 -5 0 0 10 5 z',
                                    'fill': '#000000',
                                    'stroke': '#000000'
                                }
                            }
                        }
                    },
                    {
                        type: 'Dependency',
                        attrs: {
                            line: {
                                stroke: '#000000',
                                targetMarker: {
                                    'type': 'path',
                                    'd': 'M 10 -5 0 0 10 5 z',
                                    'fill': '#000000',
                                    'stroke': '#000000'
                                }
                            }
                        }
                    },
                    
                ]
            };
        }
    }
