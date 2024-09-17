//
//  CalendarPickerBridge.m
//  movies
//
//  Created by Thiha the Dev on 2024/09/17.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CalendarPicker, NSObject)

RCT_EXTERN_METHOD(openCalendar: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

@end
