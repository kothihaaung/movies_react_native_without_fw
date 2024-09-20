package com.movies.features.calendarpicker

import android.app.DatePickerDialog
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class CalendarPicker(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CalendarPicker"
    }

    @ReactMethod
    fun openCalendar(promise: Promise) {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            val c = Calendar.getInstance()
            val year = c.get(Calendar.YEAR)
            val month = c.get(Calendar.MONTH)
            val day = c.get(Calendar.DAY_OF_MONTH)

            // Create the DatePickerDialog
            val pickerDialog = DatePickerDialog(activity, { _, selectedYear, selectedMonth, selectedDay ->
                // Format the selected date
                val selectedDate = "$selectedDay ${getMonthName(selectedMonth)}, $selectedYear"
                // Resolve the promise with the selected date
                promise.resolve(selectedDate)

            }, year, month, day)

            // Show the DatePickerDialog
            pickerDialog.show()
        }
    }

    private fun getMonthName(monthIndex: Int): String {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.MONTH, monthIndex)
        val monthDate = SimpleDateFormat("MMMM", Locale.getDefault())
        return monthDate.format(calendar.time)
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
