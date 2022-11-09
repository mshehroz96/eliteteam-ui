/**
 * App Calendar
 */

/**
 * ! If both start and end dates are same Full calendar will nullify the end date value.
 * ! Full calendar will end the event on a day before at 12:00:00AM thus, event won't extend to the end date.
 * ! We are getting events from a separate file named app-calendar-events.js. You can add or remove events from there.
 *
 **/

//"use strict";

let direction = "ltr";
let strContext = document.getElementById("context").getAttribute("value");

if (isRtl) {
  direction = "rtl";
}

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    const calendarEl = document.getElementById("divAvailabilityCalendar"),
      calendarsColor = {
        InterviewInPerson: "primary",
        InterviewZoom: "primary",
        Availability: "success",
        Family: "info",
        ETC: "info",
      },
      btnsDelete = document.querySelector(".proxy_delete_availability"),
      eventStartDate = document.querySelector("#eventStartDate"),
      eventEndDate = document.querySelector("#eventEndDate"),
      eventLabel = $("#eventLabel"), // ! Using jquery vars due to select2 jQuery dependency
      eventGuests = $("#eventGuests"), // ! Using jquery vars due to select2 jQuery dependency
      selectAll = document.querySelector(".select-all"),
      filterInput = [].slice.call(document.querySelectorAll(".input-filter"));
    //inlineCalendar = document.querySelector(".inline-calendar");

    let eventToUpdate,
      currentEvents = events, // Assign app-calendar-events.js file events (assume events from API) to currentEvents (browser store/object) to manage and update calender events
      isFormValid = false;

    // Init event Offcanvas
    //const bsAddEventSidebar = new bootstrap.Offcanvas(addEventSidebar);

    //! TODO: Update Event label and guest code to JS once select removes jQuery dependency
    // Event Label (select2)
    if (eventLabel.length) {
      function renderBadges(option) {
        if (!option.id) {
          return option.text;
        }
        var $badge =
          "<span class='badge badge-dot bg-" +
          $(option.element).data("label") +
          " me-2'> " +
          "</span>" +
          option.text;

        return $badge;
      }
      eventLabel.wrap('<div class="position-relative"></div>').select2({
        placeholder: "Select value",
        dropdownParent: eventLabel.parent(),
        templateResult: renderBadges,
        templateSelection: renderBadges,
        minimumResultsForSearch: -1,
        escapeMarkup: function (es) {
          return es;
        },
      });
    }

    // Event Guests (select2)
    if (eventGuests.length) {
      function renderGuestAvatar(option) {
        if (!option.id) {
          return option.text;
        }
        var $avatar =
          "<div class='d-flex flex-wrap align-items-center'>" +
          "<div class='avatar avatar-xs me-2'>" +
          "<img src='" +
          assetsPath +
          "img/avatars/" +
          $(option.element).data("avatar") +
          "' alt='avatar' class='rounded-circle' />" +
          "</div>" +
          option.text +
          "</div>";

        return $avatar;
      }
      eventGuests.wrap('<div class="position-relative"></div>').select2({
        placeholder: "Select value",
        dropdownParent: eventGuests.parent(),
        closeOnSelect: false,
        templateResult: renderGuestAvatar,
        templateSelection: renderGuestAvatar,
        escapeMarkup: function (es) {
          return es;
        },
      });
    }

    // Event start (flatpicker)
    if (eventStartDate) {
      var start = eventStartDate.flatpickr({
        enableTime: true,
        altFormat: "Y-m-dTH:i:S",
        onReady: function (selectedDates, dateStr, instance) {
          if (instance.isMobile) {
            instance.mobileInput.setAttribute("step", null);
          }
        },
      });
    }

    // Event end (flatpicker)
    if (eventEndDate) {
      var end = eventEndDate.flatpickr({
        enableTime: true,
        altFormat: "Y-m-dTH:i:S",
        onReady: function (selectedDates, dateStr, instance) {
          if (instance.isMobile) {
            instance.mobileInput.setAttribute("step", null);
          }
        },
      });
    }

    // Filter events by calender
    function selectedCalendars() {
      let selected = [],
        filterInputChecked = [].slice.call(
          document.querySelectorAll(".input-filter:checked")
        );

      filterInputChecked.forEach((item) => {
        selected.push(item.getAttribute("data-value"));
      });

      return selected;
    }

    function fetchEvents(info, successCallback) {
      // Fetch Events from API endpoint reference
      let selectedEvents = currentEvents;

      var arrSelectedJobTitleFilter = $("#ddlJobTitles").val();
      var arrSelectedEvents = [];
      for (var i = 0; i < selectedEvents.length; i++) {
        if (arrSelectedJobTitleFilter.length > 0) {
          var strJobTitle = selectedEvents[i].extendedProps.job_title;
          var blnMatch = false;
          if (strJobTitle != "[MyAvailability]") {
            for (var j = 0; j < arrSelectedJobTitleFilter.length; j++) {
              if (strJobTitle == arrSelectedJobTitleFilter[j]) {
                blnMatch = true;
                break;
              }
            }
            if (blnMatch) {
              arrSelectedEvents.push(selectedEvents[i]);
            }
          } else {
            arrSelectedEvents.push(selectedEvents[i]);
          }
        } else {
          arrSelectedEvents.push(selectedEvents[i]);
        }
      }
      if (arrSelectedEvents.length == 0) {
        arrSelectedEvents = selectedEvents;
      }

      successCallback(arrSelectedEvents);
    }

    // Init FullCalendar
    // ------------------------------------------------
    let { dayGrid, interaction, timeGrid, list } = calendarPlugins;
    calendar = new Calendar(calendarEl, {
      initialView: "dayGridMonth",
      nowIndicator: true,
      slotDuration: "00:05:00",
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      selectable: true,
      showNonCurrentDates: false,
      allDaySlot: false,
      unselectAuto: false,
      events: fetchEvents,
      plugins: [interaction, dayGrid, timeGrid, list],
      editable: true,
      dragScroll: true,
      dayMaxEvents: 2,
      eventResizableFromStart: true,
      headerToolbar: {
        start: "prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },
      //<button class="fc-next-button fc-button fc-button-primary" type="button" aria-label="next"><span class="fc-icon fc-icon-chevron-right"></span></button>
      direction: direction,
      initialDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      eventClassNames: function ({ event: calendarEvent }) {
        const colorName =
          calendarsColor[calendarEvent._def.extendedProps.calendar];
        // Background Color
        return ["fc-event-" + colorName];
      },
      dateClick: function (info) {
        let date = moment(info.date).format("YYYY-MM-DD");
        //eventStartDate.value = date;
        //eventEndDate.value = date;
      },
      eventClick: function (info) {
        var strMarkup = "<div style='padding-top:1px;'>";
        var datEventStart = new moment(info.event.start);
        var datEventEnd = new moment(info.event.end);
        var strDuration = datEventEnd.to(datEventStart, true);
        var strEventType1 = "";
        var strEventType2 = "";
        if (info.event.extendedProps.calendar == "InterviewZoom") {
          strEventType1 = "Interview";
          strEventType2 = "Zoom";
        } else if (info.event.extendedProps.calendar == "InterviewInPerson") {
          strEventType1 = "Interview";
          strEventType2 = "In Person";
        } else if (info.event.extendedProps.calendar == "Availability") {
          strEventType1 = "Availability";
          strEventType2 = "";
        } else if (info.event.extendedProps.calendar == "Family") {
          strEventType1 = "Client Meeting";
          strEventType2 = "";
        }

        if (info.event.extendedProps.calendar == "Availability") {
          strMarkup += "<div class='ps-2'>";
          strMarkup += "<h4 class='text-success'>My Availability</h4>";
          strMarkup += "<br>";
          strMarkup +=
            "  <table class='table table-sm table-bordered rounded-corners'>";
          strMarkup += "	<tbody>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Selected Date</b></td>";
          strMarkup +=
            "		<td class='small'>" + datEventStart.format("MM/DD/YYYY") + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Date Range</b></td>";
          strMarkup +=
            "		<td class='small'>" +
            info.event.extendedProps.recur_start_date +
            " <i class='bx bxs-right-arrow-alt align-top'></i> " +
            info.event.extendedProps.recur_end_date +
            "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Time Range</b></td>";
          strMarkup +=
            "		<td class='small'>" +
            datEventStart.format("h:mm A") +
            " <i class='bx bxs-right-arrow-alt align-top'></i> " +
            datEventEnd.format("h:mm A") +
            "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Duration</b></td>";
          strMarkup += "		<td class='small'>" + strDuration + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Occurrence</b></td>";
          if (info.event.extendedProps.event_type == "Series") {
            strMarkup +=
              "		<td class='small'><span class='badge bg-success'>" +
              info.event.extendedProps.event_type +
              "</span></td>";
          } else {
            strMarkup +=
              "		<td class='small'><span class='badge bg-primary'>" +
              info.event.extendedProps.event_type +
              "</span></td>";
          }
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='text-left'>";

          if (info.event.extendedProps.event_type == "Single") {
            strMarkup +=
              "		    <button class='btn btn-sm btn-outline-danger me-1 proxy_delete_availability' data-actiontype='Series-One' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete</button>";
          } else if (info.event.extendedProps.event_type == "Series") {
            strMarkup += "<div class='btn-group'>";
            strMarkup +=
              "  <button type='button' class='btn btn-outline-danger btn-sm dropdown-toggle me-1' data-bs-toggle='dropdown'>Delete</button>";
            strMarkup += "  <ul class='dropdown-menu'>";
            strMarkup +=
              "    <li><a class='dropdown-item proxy_delete_availability' href='javascript:void(0);' data-actiontype='Series-One' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete Only " +
              datEventStart.format("MM/DD/YYYY") +
              "</a></li>";
            strMarkup +=
              "    <li><a class='dropdown-item proxy_delete_availability' href='javascript:void(0);' data-actiontype='Series-All' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete Series</a></li>";
            strMarkup += "  </ul>";
            strMarkup += "</div> ";
          }

          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	</tbody>";
          strMarkup += "  </table>";
          strMarkup += "</div>";
          strMarkup += "";
        } else if (info.event.extendedProps.calendar == "Family") {
          strMarkup += "<div class='ps-2'>";
          strMarkup += "<h4 class='text-info'>Client Meeting</h4>";
          strMarkup += "<br>";
          strMarkup +=
            "  <table class='table table-sm table-bordered rounded-corners'>";
          strMarkup += "	<tbody>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Date</b></td>";
          strMarkup +=
            "		<td class='small'>" +
            info.event.extendedProps.recur_start_date +
            "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Time</b></td>";
          strMarkup +=
            "		<td class='small'>" + datEventStart.format("h:mm A") + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Duration</b></td>";
          strMarkup += "		<td class='small'>" + strDuration + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Occurrence</b></td>";
          if (info.event.extendedProps.event_type == "Series") {
            strMarkup +=
              "		<td class='small'><span class='badge bg-success'>" +
              info.event.extendedProps.event_type +
              "</span></td>";
          } else {
            strMarkup +=
              "		<td class='small'><span class='badge bg-primary'>" +
              info.event.extendedProps.event_type +
              "</span></td>";
          }
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='text-left'>";

          if (info.event.extendedProps.event_type == "Single") {
            strMarkup +=
              "		    <button class='btn btn-sm btn-outline-danger me-1 proxy_delete_availability' data-actiontype='Series-One' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete</button>";
          } else if (info.event.extendedProps.event_type == "Series") {
            strMarkup += "<div class='btn-group'>";
            strMarkup +=
              "  <button type='button' class='btn btn-outline-danger btn-sm dropdown-toggle me-1' data-bs-toggle='dropdown'>Delete</button>";
            strMarkup += "  <ul class='dropdown-menu'>";
            strMarkup +=
              "    <li><a class='dropdown-item proxy_delete_availability' href='javascript:void(0);' data-actiontype='Series-One' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete Only " +
              datEventStart.format("MM/DD/YYYY") +
              "</a></li>";
            strMarkup +=
              "    <li><a class='dropdown-item proxy_delete_availability' href='javascript:void(0);' data-actiontype='Series-All' data-eventid='" +
              info.event.id +
              "' data-groupid='" +
              info.event.groupId +
              "' data-eventtype='" +
              info.event.extendedProps.event_type +
              "' data-currentdate='" +
              datEventStart.format("MM/DD/YYYY") +
              "'>Delete Series</a></li>";
            strMarkup += "  </ul>";
            strMarkup += "</div> ";
          }

          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	</tbody>";
          strMarkup += "  </table>";
          strMarkup += "</div>";
          strMarkup += GetContent("RecruiterOrClient", info);
          strMarkup += "";
        } else {
          strMarkup += "<div class='divider text-start mt-0'>";
          strMarkup += "  <div class='divider-text'>Candidate</div>";
          strMarkup += "</div>";

          strMarkup += "<div class='ps-2'>";
          strMarkup +=
            "  <span id='spnInterviewDetails_Candidate'><div class='mx-auto' style='vertical-align:middle;'>  <a href='CandidateProfile.php?id=4&amp;pt=Video&amp;jn=Registered%20Nurse&amp;f=Interview%20Scheduled' target='_blank'><img class='w-px-75 rounded-circle proxy_applicant_picture' src='../assets/img/avatars/" +
            info.event.extendedProps.avatar +
            "'></a>  <span style='display:inline-block;padding-left:10px;vertical-align:middle;'>    <span style='font-size:20px;display:inline-block;'><a href='CandidateProfile.php?id=4&amp;pt=Video&amp;jn=Registered%20Nurse&amp;f=Interview%20Scheduled' target='_blank'><span class='proxy_applicant_name'>" +
            info.event.title +
            "</span></a></span>    <span style='font-size:15px;display:block;'>      <div class='input-group'>        <button class='btn btn-sm btn-outline-secondary dropdown-toggle ' type='button' data-bs-toggle='dropdown'>Contacts</button>        <ul class='dropdown-menu dropdown-menu-end'>          <li><a class='dropdown-item' href='Messages.php' target='_blank'><i class='bx bxs-chat'></i> Open Chat</a></li>        </ul>      </div>    </span>  </span></div></span>";
          strMarkup += "</div>";
          strMarkup += "";

          strMarkup += GetContent("RecruiterOrClient", info);

          strMarkup += GetContent("InterviewDetails", info);

          strMarkup += "<div class='divider text-start'>";
          strMarkup += "  <div class='divider-text'>Job</div>";
          strMarkup += "</div>";
          strMarkup += "<div class='ps-2'>";
          strMarkup +=
            "  <table class='table table-sm table-bordered rounded-corners'>";
          strMarkup += "	<tbody>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Job Title</b></td>";
          strMarkup +=
            "		<td class='small'><a href='Interviews.php?jn=" +
            info.event.extendedProps.job_title +
            "&amp;status=In%20Progress&amp;pt=" +
            info.event.extendedProps.job_campaign_type +
            "' target='_blank'>" +
            info.event.extendedProps.job_title +
            "</a></td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Campaign Type</b></td>";
          strMarkup += "		<td class='small'>";
          if (info.event.extendedProps.job_campaign_type == "Video") {
            strMarkup += "<i class='bx bxs-video'></i> Video";
          } else if (info.event.extendedProps.job_campaign_type == "Resume") {
            strMarkup += "<i class='bx bxs-detail'></i> Resume";
          } else if (
            info.event.extendedProps.job_campaign_type == "Interview"
          ) {
            strMarkup += "<i class='bx bxs-calendar'></i> Interview";
          }
          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Active Candidates</b></td>";
          strMarkup += "		<td class='small'>3</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	</tbody>";
          strMarkup += "  </table>";
          strMarkup += "</div>";
        }

        $("#divAvailabilityCalendarEventDetails").html(strMarkup);
        $("#divAvailabilityCalendarEventDetailsContainer").removeClass(
          "d-none"
        );
        $("#divAvailabilityCalendarNewEvent").addClass("d-none");
      },
      datesSet: function () {
        //modifyToggler();
      },
      viewDidMount: function () {
        //modifyToggler();
      },
      select: function (info) {
        $("#divAvailabilityCalendarEventDetailsContainer").addClass("d-none");
        $("#divAvailabilityCalendarNewEvent").addClass("d-none");
        $(".proxy_calendar_side_panel").addClass("d-none");
        $("#divAvailabilityCalendarScheduleClientMeeting").addClass("d-none");

        if (strContext == "client") {
          $("#divAvailabilityCalendarNewEvent").removeClass("d-none");
        }
        
        $("#context-menu")
          .css({
            display: "block",
            top: info.jsEvent.clientY,
            left: info.jsEvent.clientX + 10,
          })
          .addClass("show");

        var datFrom = new moment(info.startStr);
        var datTo = new moment(info.endStr);

        if (
          datFrom.format("HH:mm") == "00:00" &&
          datTo.format("HH:mm") == "00:00"
        ) {
          datTo.add(-1, "day");
          //Month Level
        }

        $("#txbNewEventDateRange")
          .data("daterangepicker")
          .setStartDate(datFrom.format("MM/DD/YYYY"));
        $("#txbNewEventDateRange")
          .data("daterangepicker")
          .setEndDate(datTo.format("MM/DD/YYYY"));

        var timFrom = new moment(info.startStr);
        var timTo = new moment(info.endStr);
        if (
          timFrom.format("HH:mm") == "00:00" &&
          timTo.format("HH:mm") == "00:00"
        ) {
          //Month Level
        } else {
          $("#txbNewEventTimeRangeFrom").val(
            timFrom.format("HH") +
              ":" +
              (Math.round(parseInt(timFrom.format("mm")) / 5) * 5).toString()
          );
          var flatpickrTimeFrom = document.querySelector(
            "#txbNewEventTimeRangeFrom"
          );
          if (flatpickrTimeFrom) {
            flatpickrTimeFrom.flatpickr({
              enableTime: true,
              noCalendar: true,
              allowInput: true,
              dateFormat: "H:i",
              time_24hr: false,
            });
          }

          $("#txbNewEventTimeRangeTo").val(
            timTo.format("HH") +
              ":" +
              (Math.round(parseInt(timTo.format("mm")) / 5) * 5).toString()
          );
          var flatpickrTimeFrom = document.querySelector(
            "#txbNewEventTimeRangeTo"
          );
          if (flatpickrTimeFrom) {
            flatpickrTimeFrom.flatpickr({
              enableTime: true,
              noCalendar: true,
              allowInput: true,
              dateFormat: "H:i",
              time_24hr: false,
            });
          }
        }

        if (strContext == "recruiter") {
          $("#txbNewEventDateRangeMeetClient").val(
            datFrom.format("MM/DD/YYYY HH:mm")
          );
          var objNewEventDateRangeMeetClient = document.querySelector(
            "#txbNewEventDateRangeMeetClient"
          );
          if (objNewEventDateRangeMeetClient) {
            objNewEventDateRangeMeetClient.flatpickr({
              enableTime: true,
              dateFormat: "m/d/Y H:i",
            });
          }
        }
      },
      eventDrop: function (info) {
        if (
          info.event.extendedProps.calendar == "InterviewInPerson" ||
          info.event.extendedProps.calendar == "InterviewZoom"
        ) {
          Swal.fire({
            title: "Rescheduled",
            text: "Interview was rescheduled successfully. All participants will be informed about the change in schedule",
            icon: "success",
            buttonsStyling: false,
          });
        }
      },
      eventResize: function (info) {
        if (
          info.event.extendedProps.calendar == "InterviewInPerson" ||
          info.event.extendedProps.calendar == "InterviewZoom"
        ) {
          info.revert();
          Swal.fire({
            title: "Not Allowed",
            html: "Sorry, the interview duration cannot be changed",
            icon: "info",
            buttonsStyling: false,
          });
        }
      },
    });

    // Render calendar
    calendar.render();

    //const eventForm = document.getElementById("eventForm");

    function GetContent(strKey, info) {
      var strMarkup = "";
      // ========================================================================================================
      if (strKey == "RecruiterOrClient") {
        // ========================================================================================================
        // ---------------------------------------------------------------------
        if (strContext == "client") {
          // ---------------------------------------------------------------------
          strMarkup += "<div class='divider text-start'>";
          strMarkup += "  <div class='divider-text'>Recruiter</div>";
          strMarkup += "</div>";
          strMarkup += "<div class='ps-2'>";
          strMarkup +=
            "  <span id='spnInterviewDetails_Recruiter'><div class='mx-auto' style='vertical-align:middle;'>  <img class='w-px-75 rounded-circle proxy_applicant_picture' src='../assets/img/avatars/13.png'>  <span style='display:inline-block;padding-left:10px;vertical-align:middle;'>    <span style='font-size:20px;display:inline-block;'><span class='proxy_applicant_name'>Charles Wicker</span></span>    <span style='font-size:15px;display:block;'>      <div class='input-group'>        <button class='btn btn-sm btn-outline-secondary dropdown-toggle ' type='button' data-bs-toggle='dropdown'>Contacts</button>        <ul class='dropdown-menu dropdown-menu-end'>          <li><a class='dropdown-item' href='Messages.php' target='_blank'><i class='bx bxs-chat'></i> Open Chat</a></li>          <li><hr class='dropdown-divider'></li>          <li><a class='dropdown-item' href='mailto:cwicker@elitehire.com'><i class='fa fa-envelope'></i> Send Email</a></li>          <li><a class='dropdown-item' href='tel:08886485454'><i class='fa fa-phone'></i> Call 0886485454</a></li>          <li><a class='dropdown-item' href='sms:08886485454'><i class='bx bx-message'></i> Send SMS</a></li>          <li><a class='dropdown-item' href='https://wa.me/08886485454'><i class='bx bxl-whatsapp'></i> Send Whatsapp Message</a></li>        </ul>      </div>    </span>  </span></div></span>";
          strMarkup += "</div>";
        }
        // ---------------------------------------------------------------------
        else if (strContext == "recruiter") {
          // ---------------------------------------------------------------------
          strMarkup += "<div class='divider text-start'>";
          strMarkup += "  <div class='divider-text'>Client</div>";
          strMarkup += "</div>";
          strMarkup += "<div class='ps-2'>";
          //strMarkup +="  <span id='spnInterviewDetails_Client'><div class='mx-auto' style='vertical-align:middle;'>  <img class='w-px-75 rounded-circle proxy_applicant_picture' src='../assets/img/avatars/1.png'>  <span style='display:inline-block;padding-left:10px;vertical-align:middle;'>    <span style='font-size:20px;display:inline-block;'><span class='proxy_applicant_name'>John Doe <span style='font-size:14px;display:inline-block;'>My Company Pvt. Ltd.</span></span><span style='font-size:15px;display:block;'>      <div class='input-group'>        <button class='btn btn-sm btn-outline-secondary dropdown-toggle ' type='button' data-bs-toggle='dropdown'>Contacts</button>        <ul class='dropdown-menu dropdown-menu-end'>          <li><a class='dropdown-item' href='Messages.php' target='_blank'><i class='bx bxs-chat'></i> Open Chat</a></li>          <li><hr class='dropdown-divider'></li>          <li><a class='dropdown-item' href='mailto:cwicker@elitehire.com'><i class='fa fa-envelope'></i> Send Email</a></li>          <li><a class='dropdown-item' href='tel:08886485454'><i class='fa fa-phone'></i> Call 0886485454</a></li>          <li><a class='dropdown-item' href='sms:08886485454'><i class='bx bx-message'></i> Send SMS</a></li>          <li><a class='dropdown-item' href='https://wa.me/08886485454'><i class='bx bxl-whatsapp'></i> Send Whatsapp Message</a></li>        </ul>      </div>    </span>  </span></div></span>";

          strMarkup += "  <div class='d-flex flex-wrap'> ";
          strMarkup += "    <div class='avatar avatar-lg me-3'> ";
          strMarkup +=
            "      <img src='../assets/img/avatars/1.png' class='w-px-75 h-px-75 rounded-circle'> ";
          strMarkup += "    </div> ";
          strMarkup +=
            "    <div class='d-flex justify-content-center flex-column'> ";
          strMarkup += "      <h5 class='mb-0 ps-2'>John Doe</h5> ";
          strMarkup +=
            "      <span class='ps-2'><small>My Company Pvt. Ltd.</small></span> ";
          strMarkup +=
            "      <span class='ps-2' style='display:block;'>      <div class='input-group'>        <button class='btn btn-sm btn-outline-secondary dropdown-toggle ' type='button' data-bs-toggle='dropdown'>Contacts</button>        <ul class='dropdown-menu dropdown-menu-end'>          <li><a class='dropdown-item' href='Messages.php' target='_blank'><i class='bx bxs-chat'></i> Open Chat</a></li>          <li><hr class='dropdown-divider'></li>          <li><a class='dropdown-item' href='mailto:cwicker@elitehire.com'><i class='fa fa-envelope'></i> Send Email</a></li>          <li><a class='dropdown-item' href='tel:08886485454'><i class='fa fa-phone'></i> Call 0886485454</a></li>          <li><a class='dropdown-item' href='sms:08886485454'><i class='bx bx-message'></i> Send SMS</a></li>          <li><a class='dropdown-item' href='https://wa.me/08886485454'><i class='bx bxl-whatsapp'></i> Send Whatsapp Message</a></li>        </ul>      </div>    </span>  </span></div> ";
          strMarkup += "    </div> ";
          strMarkup += "  </div> ";

          strMarkup += "</div>";
        }
      }
      // ========================================================================================================
      else if (strKey == "InterviewDetails") {
        // ========================================================================================================
        var datEventStart = new moment(info.event.start);
        var datEventEnd = new moment(info.event.end);
        var strDuration = datEventEnd.to(datEventStart, true);
        var strEventType1 = "";
        var strEventType2 = "";
        if (info.event.extendedProps.calendar == "InterviewZoom") {
          strEventType1 = "Interview";
          strEventType2 = "Zoom";
        } else if (info.event.extendedProps.calendar == "InterviewInPerson") {
          strEventType1 = "Interview";
          strEventType2 = "In Person";
        } else if (info.event.extendedProps.calendar == "Availability") {
          strEventType1 = "Availability";
          strEventType2 = "";
        }
        // ---------------------------------------------------------------------
        if (strContext == "client") {
          // ---------------------------------------------------------------------
          strMarkup += "<div class='divider text-start'>";
          strMarkup += "  <div class='divider-text'>Interview Details</div>";
          strMarkup += "</div>";
          strMarkup +=
            "  <div class='ps-2'><table class='table table-sm table-bordered'>";
          strMarkup += "	<tbody>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Start</b></td>";
          strMarkup +=
            "		<td class='small'>" + datEventStart.format("h:mm A") + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Duration</b></td>";
          strMarkup += "		<td class='small'>" + strDuration + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Type</b></td>";
          strMarkup +=
            "		<td class='small'>" +
            strEventType2 +
            (strEventType2 == "Zoom"
              ? " <button class='btn btn-xs btn-outline-primary float-end'>Join</button>"
              : "") +
            "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='small'>";
          strMarkup += "		  <b>Participants:</b><br>";
          strMarkup += "		  <div class='ps-1'>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> " +
            info.event.title +
            " <span class='badge bg-primary small'>Candidate</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> John Doe <span class='badge bg-primary small'>Me</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> Charles Wicker <span class='badge bg-primary small'>Recruiter</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> John L. Carson <span class='badge bg-primary small'>Invitee</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> r.jack@mycompany.com <span class='badge bg-secondary small'>Invitee</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> c.eli@mycompany.com <span class='badge bg-secondary small'>Invitee</span><br>";
          strMarkup += "		  </div>";
          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='text-left'>";
          strMarkup +=
            "		  <button class='btn btn-xs btn-outline-secondary float-exnd'>Reschedule</button>";
          strMarkup +=
            "		  <button class='btn btn-xs btn-outline-danger proxy_delete_interview me-1' data-eventid='" +
            info.event.id +
            "'>Cancel</button>";
          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "";
          strMarkup += "	</tbody>";
          strMarkup += "  </table></div>";
          strMarkup += "  <ul class='list-group d-none '>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Start</span><span>9:30 AM</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Duration</span><span>30 min</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Type</span><span>Zoom Interview</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup +=
            "	  <span>Link</span><span><a href=''>Join Zoom Meeting</a></span>";
          strMarkup += "	</li>";
          strMarkup += "  </ul>";
          strMarkup += "</div>";
        }
        // ---------------------------------------------------------------------
        else if (strContext == "recruiter") {
          // ---------------------------------------------------------------------
          strMarkup += "<div class='divider text-start'>";
          strMarkup += "  <div class='divider-text'>Interview Details</div>";
          strMarkup += "</div>";
          strMarkup +=
            "  <div class='ps-2'><table class='table table-sm table-bordered'>";
          strMarkup += "	<tbody>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Start</b></td>";
          strMarkup +=
            "		<td class='small'>" + datEventStart.format("h:mm A") + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Duration</b></td>";
          strMarkup += "		<td class='small'>" + strDuration + "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td class='small'><b>Type</b></td>";
          strMarkup +=
            "		<td class='small'>" +
            strEventType2 +
            (strEventType2 == "Zoom"
              ? " <button class='btn btn-xs btn-outline-primary float-end'>Join</button>"
              : "") +
            "</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='small'>";
          strMarkup += "		  <b>Participants:</b><br>";
          strMarkup += "		  <div class='ps-1'>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> " +
            info.event.title +
            " <span class='badge bg-primary small'>Candidate</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> John Doe <span class='badge bg-primary small'>Client</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> Charles Wicker <span class='badge bg-primary small'>Me</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> John L. Carson <span class='badge bg-primary small'>Client - Invitee</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> r.jack@mycompany.com <span class='badge bg-secondary small'>Client - Invitee</span><br>";
          strMarkup +=
            "			<i class='bx bxs-user'></i> c.eli@mycompany.com <span class='badge bg-secondary small'>Client - Invitee</span><br>";
          strMarkup += "		  </div>";
          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "	  <tr>";
          strMarkup += "		<td colspan='2' class='text-left'>";
          strMarkup +=
            "		  <button class='btn btn-xs btn-outline-secondary float-exnd'>Reschedule</button>";
          strMarkup +=
            "		  <button class='btn btn-xs btn-outline-danger proxy_delete_interview me-1' data-eventid='" +
            info.event.id +
            "'>Cancel</button>";
          strMarkup += "		</td>";
          strMarkup += "	  </tr>";
          strMarkup += "";
          strMarkup += "	</tbody>";
          strMarkup += "  </table></div>";
          strMarkup += "  <ul class='list-group d-none '>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Start</span><span>9:30 AM</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Duration</span><span>30 min</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup += "	  <span>Type</span><span>Zoom Interview</span>";
          strMarkup += "	</li>";
          strMarkup +=
            "	<li class='list-group-item d-flex align-items-center justify-content-between'>";
          strMarkup +=
            "	  <span>Link</span><span><a href=''>Join Zoom Meeting</a></span>";
          strMarkup += "	</li>";
          strMarkup += "  </ul>";
          strMarkup += "</div>";
        }
      }
      return strMarkup;
    }

    // Add Event
    // ------------------------------------------------
    function addEvent(eventData) {
      // ? Add new event data to current events object and refetch it to display on calender
      // ? You can write below code to AJAX call success response
      currentEvents.push(eventData);
      calendar.refetchEvents();
      // ? To add event directly to calender (won't update currentEvents object)
      // calendar.addEvent(eventData);
    }

    // Update Event
    // ------------------------------------------------
    function updateEvent(eventData) {
      // ? Update existing event data to current events object and refetch it to display on calender
      // ? You can write below code to AJAX call success response
      eventData.id = parseInt(eventData.id);
      currentEvents[currentEvents.findIndex((el) => el.id === eventData.id)] =
        eventData; // Update event by id
      calendar.refetchEvents();
      // ? To update event directly to calender (won't update currentEvents object)
      // let propsToUpdate = ['id', 'title', 'url'];
      // let extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description'];
      // updateEventInCalendar(eventData, propsToUpdate, extendedPropsToUpdate);
    }

    // Remove Event
    // ------------------------------------------------
    function removeEvent(eventId) {
      // ? Delete existing event data to current events object and refetch it to display on calender
      // ? You can write below code to AJAX call success response
      currentEvents = currentEvents.filter(function (event) {
        return event.id != eventId;
      });
      calendar.refetchEvents();
      // ? To delete event directly to calender (won't update currentEvents object)
      // removeEventInCalendar(eventId);
    }

    // Remove Group Event
    // ------------------------------------------------
    function removeGroupEvent(groupId) {
      currentEvents = currentEvents.filter(function (event) {
        return event.groupId != groupId;
      });
      calendar.refetchEvents();
    }

    // (Update Event In Calendar (UI Only)
    // ------------------------------------------------
    const updateEventInCalendar = (
      updatedEventData,
      propsToUpdate,
      extendedPropsToUpdate
    ) => {
      const existingEvent = calendar.getEventById(updatedEventData.id);

      // --- Set event properties except date related ----- //
      // ? Docs: https://fullcalendar.io/docs/Event-setProp
      // dateRelatedProps => ['start', 'end', 'allDay']
      // eslint-disable-next-line no-plusplus
      for (var index = 0; index < propsToUpdate.length; index++) {
        var propName = propsToUpdate[index];
        existingEvent.setProp(propName, updatedEventData[propName]);
      }

      // --- Set date related props ----- //
      // ? Docs: https://fullcalendar.io/docs/Event-setDates
      existingEvent.setDates(updatedEventData.start, updatedEventData.end, {
        allDay: updatedEventData.allDay,
      });

      // --- Set event's extendedProps ----- //
      // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
      // eslint-disable-next-line no-plusplus
      for (var index = 0; index < extendedPropsToUpdate.length; index++) {
        var propName = extendedPropsToUpdate[index];
        existingEvent.setExtendedProp(
          propName,
          updatedEventData.extendedProps[propName]
        );
      }
    };

    $(document).on("click", "#btnJobTitlesFilter", function (e) {
      e.preventDefault();
      calendar.refetchEvents();
    });

    $(document).on("click", ".proxy_delete_availability", function (e) {
      e.preventDefault();

      var strActionType = $(this).attr("data-actiontype");
      var intEventID = $(this).attr("data-eventid");
      var strGroupID = $(this).attr("data-groupid");
      var strEventType = $(this).attr("data-eventtype");
      var strCurrentDate = $(this).attr("data-currentdate");
      var evtCurrent = calendar.getEventById(intEventID);

      var datMin = null;
      var datMax = null;
      var datIterator = null;

      //--------------------------------------------------------------
      if (strActionType == "Series-One") {
        //--------------------------------------------------------------
        datMin = new moment(
          strCurrentDate + " " + new moment(evtCurrent.start).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
        datMax = new moment(
          strCurrentDate + " " + new moment(evtCurrent.end).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
        datIterator = new moment(
          strCurrentDate + " " + new moment(evtCurrent.start).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
      }
      //--------------------------------------------------------------
      else if (strActionType == "Series-All") {
        //--------------------------------------------------------------
        datMin = new moment(
          evtCurrent.extendedProps.recur_start_date +
            " " +
            new moment(evtCurrent.start).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
        datMax = new moment(
          evtCurrent.extendedProps.recur_end_date +
            " " +
            new moment(evtCurrent.end).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
        datIterator = new moment(
          evtCurrent.extendedProps.recur_start_date +
            " " +
            new moment(evtCurrent.start).format("hh:mm A"),
          "MM/DD/YYYY hh:mm A"
        );
      }

      var arrEvents = calendar.getEvents();
      var arrOverlappingEvents = [];
      for (var i = 0; i < arrEvents.length; i++) {
        //TODO: this logic need to be redone, where we should check for overlap not against Min/Max values, but instead: each event with each instance of the item (or item series) being deleted
        //000111111000 source
        //002221111000 overlap beginning
        //000122211000 overlap containing
        //000111122200 overlap ending
        if (arrEvents[i].extendedProps.calendar != "Availability") {
          var datEventStart = new moment(arrEvents[i].start);
          var datEventEnd = new moment(arrEvents[i].end);
          var blnOverlapping = false;

          if (
            datEventStart < datMin &&
            datEventEnd <= datMax &&
            datEventEnd >= datMin
          ) {
            //overlap beginning
            console.log(
              arrEvents[i].title +
                " overlap_beginning [Event: " +
                datEventStart.format("MM/DD/YYYY hh:mm A") +
                "-" +
                datEventEnd.format("MM/DD/YYYY hh:mm A") +
                ", Min:" +
                datMin.format("MM/DD/YYYY hh:mm A") +
                ",  Max:" +
                datMax.format("MM/DD/YYYY hh:mm A") +
                "]"
            );
            blnOverlapping = true;
          } else if (datEventStart >= datMin && datEventEnd <= datMax) {
            //overlap containing
            console.log(
              arrEvents[i].title +
                " overlap_containing [Event: " +
                datEventStart.format("MM/DD/YYYY hh:mm A") +
                "-" +
                datEventEnd.format("MM/DD/YYYY hh:mm A") +
                ", Min:" +
                datMin.format("MM/DD/YYYY hh:mm A") +
                ",  Max:" +
                datMax.format("MM/DD/YYYY hh:mm A") +
                "]"
            );
            blnOverlapping = true;
          } else if (
            datEventStart >= datMin &&
            datEventStart <= datMax &&
            datEventEnd > datMax
          ) {
            //overlap ending
            console.log(
              arrEvents[i].title +
                " overlap_ending [Event: " +
                datEventStart.format("MM/DD/YYYY hh:mm A") +
                "-" +
                datEventEnd.format("MM/DD/YYYY hh:mm A") +
                ", Min:" +
                datMin.format("MM/DD/YYYY hh:mm A") +
                ",  Max:" +
                datMax.format("MM/DD/YYYY hh:mm A") +
                "]"
            );
            blnOverlapping = true;
          }
          if (blnOverlapping) {
            arrOverlappingEvents.push(arrEvents[i]);
          }
        }
      }

      var strMessage = "";

      if (arrOverlappingEvents.length == 0) {
        strMessage = "Are you sure you want to delete this schedule?";
      } else {
        strMessage =
          "There are  " +
          arrOverlappingEvents.length +
          " appointments scheduled in this duration. Are you sure you want to delete this schedule? <small><br>";
        for (var i = 0; i < arrOverlappingEvents.length; i++) {
          strMessage +=
            "<br>" +
            arrOverlappingEvents[i].title +
            " Interview @ " +
            new moment(arrOverlappingEvents[i].start).format(
              "MM/DD/YYYY hh:mm A"
            );
        }
        strMessage += "</small>";
      }

      Swal.fire({
        title: "Confirm Deletion",
        html: strMessage,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn btn-primary me-2",
          cancelButton: "btn btn-label-secondary",
        },
        buttonsStyling: false,
      }).then(function (result) {
        if (result.value) {
          if (strEventType == "Single") {
            removeEvent(parseInt(intEventID));
          } else if (strEventType == "Series") {
            if (strActionType == "Series-One") {
              removeEvent(parseInt(intEventID));
            } else if (strActionType == "Series-All") {
              removeGroupEvent(strGroupID);
            }
          }
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "The availability schedule was deleted succesfully.",
            customClass: {
              confirmButton: "btn btn-success",
            },
          }).then(function (result) {
            if (result.value) {
              $("#divAvailabilityCalendarEventDetails").html("");
              $("#divAvailabilityCalendarEventDetailsContainer").addClass(
                "d-none"
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
    });

    $(document).on("click", "button.proxy_delete_interview", function (e) {
      var intEventID = $(this).attr("data-eventid");

      Swal.fire({
        title: "Confirm Cancellation",
        html: "Are you sure you want to cancel this scheduled Interview?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn btn-primary me-2",
          cancelButton: "btn btn-label-secondary",
        },
        buttonsStyling: false,
      }).then(function (result) {
        if (result.value) {
          removeEvent(parseInt(intEventID));

          Swal.fire({
            icon: "success",
            title: "Cancelled",
            text: "The interview was cancelled succesfully.",
            customClass: {
              confirmButton: "btn btn-success",
            },
          }).then(function (result) {
            if (result.value) {
              $("#divAvailabilityCalendarEventDetails").html("");
              $("#divAvailabilityCalendarEventDetailsContainer").addClass(
                "d-none"
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
    });

    $(document).on("click", "#btnSetAvailability", function (e) {
      var strValue = $("#txbNewEventDateRange").val();
      var arrValue = strValue.split("-");
      var datStart = new moment(arrValue[0].trim()).startOf("day");
      var datEnd = new moment(arrValue[1].trim()).endOf("day");
      var datIterator = new moment(arrValue[0].trim()).startOf("day");
      var strStartTime = $("#txbNewEventTimeRangeFrom").val() + ":00";
      var strEndTime = $("#txbNewEventTimeRangeTo").val() + ":00";
      var newEvent = null;
      var strGroupID = "Group" + (calendar.getEvents().length + 1).toString();

      for (null; datIterator <= datEnd; datIterator.add(1, "day")) {
        newEvent = {
          groupId: strGroupID,
          id: calendar.getEvents().length + 1,
          title: "Available",
          display: "block",
          start: datIterator.format("YYYY-MM-DD") + "T" + strStartTime,
          end: datIterator.format("YYYY-MM-DD") + "T" + strEndTime,
          allDay: false,
          extendedProps: {
            calendar: "Availability",
            recur_start_date: datStart.format("MM/DD/YYYY"),
            recur_end_date: datEnd.format("MM/DD/YYYY"),
            event_type:
              datStart.format("YYYY-MM-DD") == datEnd.format("YYYY-MM-DD")
                ? "Single"
                : "Series",
            description: "I am Available",
          },
        };

        addEvent(newEvent);
        $("#divAvailabilityCalendarSetMyAvailability").addClass("d-none");
      }

      calendar.unselect();

      $("#divAvailabilityCalendarEventDetailsContainer").addClass("d-none");
      $("#divAvailabilityCalendarNewEvent").addClass("d-none");
    });

    $(document).on("click", "#btnMeetClient", function (e) {
      var strClient = $("#TagifyUserList").val();
      const objClient = JSON.parse(strClient);
      var strValue = $("#txbNewEventDateRangeMeetClient").val();
      var strDuration = $("#ddlDurationMeetClient").val();
      var intDuration = parseInt(strDuration);
      var datStart = new moment(strValue, "MM/DD/YYYY hh:mm").startOf("day");
      var datEnd = new moment(strValue, "MM/DD/YYYY hh:mm").endOf("day");
      var datIterator = new moment(strValue, "MM/DD/YYYY hh:mm").startOf("day");
      var strStartTime =
        new moment(strValue, "MM/DD/YYYY hh:mm").format("hh:mm") + ":00";
      var strEndTime =
        new moment(strValue, "MM/DD/YYYY hh:mm")
          .add(intDuration, "minute")
          .format("hh:mm") + ":00";
      var newEvent = null;
      var strGroupID = "Group" + (calendar.getEvents().length + 1).toString();

      newEvent = {
        groupId: strGroupID,
        id: calendar.getEvents().length + 1,
        title: objClient[0].name,
        display: "block",
        start: datIterator.format("YYYY-MM-DD") + "T" + strStartTime,
        end: datIterator.format("YYYY-MM-DD") + "T" + strEndTime,
        allDay: false,
        extendedProps: {
          calendar: "Family",
          recur_start_date: datStart.format("MM/DD/YYYY"),
          recur_end_date: datEnd.format("MM/DD/YYYY"),
          event_type:
            datStart.format("YYYY-MM-DD") == datEnd.format("YYYY-MM-DD")
              ? "Single"
              : "Series",
          description: "ClientMeeting",
        },
      };
      addEvent(newEvent);

      calendar.unselect();

      $(".proxy_calendar_side_panel").addClass("d-none");
    });
  })();
});
