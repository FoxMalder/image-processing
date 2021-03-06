import { createWorker } from 'redux-worker';
import reducer from './reducers';
import {
  CALCULATE_HISTOGRAM,
  CREATE_GRAYSCALE_IMAGE,
  CREATE_NEGATIVE_IMAGE,
  CREATE_SOLARISED_IMAGE,
  CREATE_INCREASED_CONTRAST,
  CREATE_DECREASED_CONTRAST,
  CREATE_BLURRED_IMAGE,
  CREATE_IMAGE_WITH_MEDIAN_FILTER,
  APPLY_KIRSCH_OPERATOR,
  APPLY_ADAPTIVE_BINARIZATION,
  ROTATE_REGION,
  SCALE_REGION
} from './actions';
import * as imageProcessor from './lib/imageProcessor';

const worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask(CALCULATE_HISTOGRAM, payload =>
  imageProcessor.calculateHistogram(payload.data, payload.channel)
);
worker.registerTask(CREATE_GRAYSCALE_IMAGE, payload =>
  imageProcessor.calculateGrayscale(payload.data)
);
worker.registerTask(CREATE_NEGATIVE_IMAGE, payload =>
  imageProcessor.calculateNegative(payload.data, payload.threshold)
);
worker.registerTask(CREATE_SOLARISED_IMAGE, payload =>
  imageProcessor.calculateSolarisation(payload.data, payload.k)
);
worker.registerTask(CREATE_INCREASED_CONTRAST, payload =>
  imageProcessor.increaseContrast(payload.data, payload.min, payload.max)
);
worker.registerTask(CREATE_DECREASED_CONTRAST, payload =>
  imageProcessor.decreaseContrast(payload.data, payload.min, payload.max)
);
worker.registerTask(CREATE_BLURRED_IMAGE, payload =>
  imageProcessor.applyBlurFilter(
    payload.data,
    payload.width,
    payload.height,
    payload.k
  )
);
worker.registerTask(CREATE_IMAGE_WITH_MEDIAN_FILTER, payload =>
  imageProcessor.applyMedianFilter(payload.data, payload.width, payload.height)
);

worker.registerTask(APPLY_KIRSCH_OPERATOR, payload =>
  imageProcessor.applyKirschOperator(
    payload.data,
    payload.width,
    payload.height
  )
);

worker.registerTask(APPLY_ADAPTIVE_BINARIZATION, payload =>
  imageProcessor.applyAdaptiveBinarization(
    payload.data,
    payload.width,
    payload.height,
    payload.c,
    payload.sliceSize
  )
);

worker.registerTask(ROTATE_REGION, payload =>
  imageProcessor.rotate(
    payload.data,
    payload.width,
    payload.height,
    payload.region,
    payload.angle,
    payload.customCenter
  )
);

worker.registerTask(SCALE_REGION, payload =>
  imageProcessor.biquadraticResampling(
    payload.data,
    payload.width,
    payload.height,
    payload.region,
    payload.scale
  )
);

export default worker;
