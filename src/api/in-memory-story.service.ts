import { InMemoryDbService, createErrorResponse, HttpMethodInterceptorArgs, createObservableResponse } from 'angular-in-memory-web-api';


export class InMemoryStoryService implements InMemoryDbService {
  // uncomment this function to force an error
  // protected get(interceptorArgs: HttpMethodInterceptorArgs) {
  //   let resp = createErrorResponse(500, 'this is a forced error from the in-memory api');
  //   return createObservableResponse(resp);
  // }

  /**
  * Creates fresh copy of data each time.
  * Safe for consuming service to morph arrays and objects.
  */
  createDb() {
    let products = [
      {
        'id': '1',
        'name': 'Awesome Product',
        'price': 10.00
      },
      {
        'id': '2',
        'name': 'Stupendous Product',
        'price': 50.00
      },
      {
        'id': '3',
        'name': 'Magnificent Product',
        'price': 100.00
      }
    ];

    return { products };
  }
}
