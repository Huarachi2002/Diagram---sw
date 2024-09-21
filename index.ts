/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

 2024-09-18 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import * as joint from '@joint/plus';
import '@joint/plus/joint-plus.css';

import KitchenSinkService from './src/services/kitchensink-service';
import { StencilService } from './src/services/stencil-service';
import { ToolbarService } from './src/services/toolbar-service';
import { InspectorService } from './src/services/inspector-service';
import { HaloService } from './src/services/halo-service';
import { KeyboardService } from './src/services/keyboard-service';

import { ThemePicker } from './src/components/theme-picker';
// import { sampleGraphs } from './src/config/sample-graphs';

// import { init } from './src/services/app';

// init()

const app = new KitchenSinkService(
    document.getElementById('app'),
    new StencilService(),
    new ToolbarService(),
    new InspectorService(),
    new HaloService(),
    new KeyboardService()
);

app.startRappid();

const themePicker = new ThemePicker({ mainView: app });
document.body.appendChild(themePicker.render().el);

// app.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));

// for easier debugging in the browser's console
declare let window: any;
window['joint'] = joint;
window['app'] = app;
