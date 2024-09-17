package com.movies.features.calendarpicker

import android.app.DatePickerDialog
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.LocalContext
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import java.util.Calendar

class CalendarPicker(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CalendarPicker"
    }

    @ReactMethod
    fun openCalendar(promise: Promise) {
        // Jetpack Compose UI logic to open calendar picker
//        promise.resolve("Date Picked from Android")

        val activity = currentActivity ?: return
        activity.runOnUiThread {
            val composeView = ComposeView(activity)
            composeView.setContent {
                DatePicker { selectedDate ->
                    promise.resolve(selectedDate) // Send the selected date to JS
                }
            }

            // Show the ComposeView in the activity
            activity.setContentView(composeView)
        }
    }
}

@Composable
fun DatePicker(onDateSelected: (String) -> Unit) {
    val context = LocalContext.current
    val calendar = Calendar.getInstance()
    val year = calendar.get(Calendar.YEAR)
    val month = calendar.get(Calendar.MONTH)
    val day = calendar.get(Calendar.DAY_OF_MONTH)

    val datePickerDialog = DatePickerDialog(
        context, { _, selectedYear, selectedMonth, selectedDay ->
            val selectedDate = "$selectedDay/${selectedMonth + 1}/$selectedYear"
            onDateSelected(selectedDate)
        }, year, month, day
    )

    // Launch the date picker
    datePickerDialog.show()
}
