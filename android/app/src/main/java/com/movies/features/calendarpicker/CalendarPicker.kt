package com.movies.features.calendarpicker

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod

class CalendarPicker(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CalendarPicker"
    }

    @ReactMethod
    fun openCalendar(promise: Promise) {
        // Jetpack Compose UI logic to open calendar picker
        promise.resolve("Date Picked from Android")
    }
}