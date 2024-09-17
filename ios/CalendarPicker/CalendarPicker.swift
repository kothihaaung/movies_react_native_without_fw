//
//  CalendarPicker.swift
//  movies
//
//  Created by Thiha the Dev on 2024/09/17.
//

import UIKit
import React

@objc(CalendarPicker)
class CalendarPicker: NSObject {
  
  @objc(openCalendar:rejecter:)
  func openCalendar(_ resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    // Open calendar logic
    resolve("Date Picked")
  }
}
