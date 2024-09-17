//
//  CalendarPicker.swift
//  movies
//
//  Created by Thiha the Dev on 2024/09/17.
//

import UIKit
import React
import SwiftUI

@objc(CalendarPicker)
class CalendarPicker: NSObject {
  
  private var datePickerController: DatePickerHostingController?
  
  @objc(openCalendar:reject:)
  func openCalendar(_ resolve: @escaping RCTPromiseResolveBlock,
                    reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async { [weak self] in
      guard let rootViewController = UIApplication.shared.windows.first?.rootViewController else {
        reject("NO_CONTROLLER", "No root view controller", nil)
        return
      }
      
      // Create a binding for the selected date
      let selectedDate = Binding<Date>(
        get: { Date() }, // initial value
        set: { _ in }    // setter to ignore changes
      )
      
      self?.datePickerController = DatePickerHostingController(
        selectedDate: selectedDate,
        onDatePicked: { date in
          // Format the date as a string
          let formatter = DateFormatter()
          formatter.dateStyle = .medium
          let dateString = formatter.string(from: date)
          
          // Resolve the promise with the selected date
          resolve(dateString)
          
          // Dismiss the view controller after picking a date
          self?.datePickerController?.dismiss(animated: true, completion: nil)
        }
      )
      
      if let datePickerController = self?.datePickerController {
        // Present the SwiftUI view controller
        rootViewController.present(datePickerController, animated: true, completion: nil)
      }
    }
  }
}

class DatePickerHostingController: UIHostingController<DatePickerView> {
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  init(selectedDate: Binding<Date>, onDatePicked: @escaping (Date) -> Void) {
    let datePickerView = DatePickerView(selectedDate: selectedDate, onDatePicked: onDatePicked)
    super.init(rootView: datePickerView)
  }
}

struct DatePickerView: View {
  @Binding var selectedDate: Date
  var onDatePicked: (Date) -> Void
  
  var body: some View {
    VStack {
      DatePicker(
        "Select a date",
        selection: $selectedDate,
        displayedComponents: [.date]
      )
      .datePickerStyle(GraphicalDatePickerStyle())
      .padding()
      
      Button(action: {
        onDatePicked(selectedDate)
      }) {
        Text("Done")
      }
      .padding()
    }
  }
}
