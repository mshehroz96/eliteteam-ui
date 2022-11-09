/**
 *  Form Wizard
 */

"use strict";
var modernStepper = null;

$(function () {
  const select2 = $(".select2"),
    selectPicker = $(".selectpicker");

  // Bootstrap select
  if (selectPicker.length) {
    selectPicker.selectpicker();
  }

  // select2
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>');
      $this.select2({
        placeholder: "Select value",
        dropdownParent: $this.parent(),
      });
    });
  }
});
(function () {
  // Modern Wizard
  // --------------------------------------------------------------------
  const wizardModern = document.querySelector(".wizard-modern-example"),
    wizardModernBtnNextList = [].slice.call(
      wizardModern.querySelectorAll(".btn-next")
    ),
    wizardModernBtnPrevList = [].slice.call(
      wizardModern.querySelectorAll(".btn-prev")
    ),
    wizardModernBtnSubmit = wizardModern.querySelector(".btn-submit");
  if (typeof wizardModern !== undefined && wizardModern !== null) {
    modernStepper = new Stepper(wizardModern, {
      linear: false,
    });
    if (wizardModernBtnNextList) {
      wizardModernBtnNextList.forEach((wizardModernBtnNext) => {
        wizardModernBtnNext.addEventListener("click", (event) => {
          modernStepper.next();
        });
      });
    }
    if (wizardModernBtnPrevList) {
      wizardModernBtnPrevList.forEach((wizardModernBtnPrev) => {
        wizardModernBtnPrev.addEventListener("click", (event) => {
          modernStepper.previous();
        });
      });
    }
    if (wizardModernBtnSubmit) {
      wizardModernBtnSubmit.addEventListener("click", (event) => {
        PayAndComplete();        
      });
    }
  }

  wizardModern.addEventListener("shown.bs-stepper", function (event) {
    //event.preventDefault()
    if (event.detail.indexStep == 4) {
      var strMarkup = "";
      //
      var strStep1Markup =
        " <a href='javascript: modernStepper.to(1);'><i class='fa fa-pencil-alt'></i></a>";
      var strStep2Markup =
        " <a href='javascript: modernStepper.to(2);'><i class='fa fa-pencil-alt'></i></a>";
      var strStep3Markup =
        " <a href='javascript: modernStepper.to(3);'><i class='fa fa-pencil-alt'></i></a>";
      var strStep4Markup =
        " <a href='javascript: modernStepper.to(4);'><i class='fa fa-pencil-alt'></i></a>";

      var strFile1 = $("#filUpload").val();
      var strFile2 = strFile1.substr(strFile1.lastIndexOf("\\") + 1);
      var strFile3 =
        "<span class=''><i class='fa fa-paperclip'></i> " +
        strFile2 +
        "</span>";

      var arrSchedule0 = $("#ddlSchedule").val();
      var strSchedule0 = "";
      for (var i = 0; i < arrSchedule0.length; i++) {
        strSchedule0 +=
          "<span class='badge bg-secondary'>" + arrSchedule0[i] + "</span> ";
      }
      strSchedule0 = "<p>" + strSchedule0 + "</p>";

      var strSchedule1 = "";
      var blnHasSchedule = false;
      if ($("#ddlSchedule").val().indexOf("Custom Schedule") >= 0) {
        strSchedule1 = $("#tabCustomSchedule").html();
        strSchedule1 = strSchedule1
          .replace(/form\-control/g, "")
          .replace(/fa fa\-paste/g, "");
        strSchedule1 =
          "<table id='tabPreviewCustomSchedule' class='table table-bordered table-hover'>" +
          strSchedule1 +
          "</table>";
        blnHasSchedule = true;
      }

      var strPay1 =
        "$" +
        $("#txbMinimum").val() +
        " - $" +
        $("#txbMaximum").val() +
        " " +
        $("#ddlPay").val();

      var arrSupplementalPay1 = $("#ddlSupplemental").val();
      var strSupplementalPay1 = "";
      for (var i = 0; i < arrSupplementalPay1.length; i++) {
        strSupplementalPay1 +=
          "<span class='badge bg-secondary'>" +
          arrSupplementalPay1[i] +
          "</span> ";
      }
      strSupplementalPay1 = "<p>" + strSupplementalPay1 + "</p>";
      if ($("#txaSupplementalMore").val().length > 1) {
        strSupplementalPay1 +=
          "<h6>Other Supplemental Pay Details</h6>" +
          $("#txaSupplementalMore").val();
      }

      var arrBenefits1 = $("#ddlBenefits").val();
      var strBenefits1 = "";
      for (var i = 0; i < arrBenefits1.length; i++) {
        strBenefits1 +=
          "<span class='badge bg-secondary'>" + arrBenefits1[i] + "</span> ";
      }
      strBenefits1 = "<p>" + strBenefits1 + "</p>";
      if ($("#ddlBenefitsGracePeriod").val().length > 1) {
        strBenefits1 +=
          "<h6 class='pt-3'>Grace Period to Qualify for Benefits</h6>" +
          $("#ddlBenefitsGracePeriod").val();
      }

      var strScreening1 = $("#ulScreeningSelectedQuestions").parent().html();
      strScreening1 = strScreening1.replace(/span/g, "span class='d-none'");

      strMarkup +=
        "" +
        "<div class='mb-3'>" +
        "<h3>" +
        strSelectedJobTitle +
        strStep1Markup +
        "</h3>" +
        "<h4>Job Description" +
        strStep1Markup +
        "</h4>" +
        $("#snow-editor .ql-editor").html() +
        "<h4>Position Requirements" +
        strStep1Markup +
        "</h4>" +
        $("#txaRequirements").val() +
        "<h4 class='pt-3'>Attachment" +
        strStep1Markup +
        "</h4>" +
        strFile3 +
        "" +
        "" +
        "<hr class='mx-n4 my-4'>" +
        "" +
        "" +
        "<h4>No. of Hires" +
        strStep2Markup +
        "</h4>" +
        $("#ddlHireCount").val() +
        "<h4 class='pt-3'>Hire Urgency" +
        strStep2Markup +
        "</h4>" +
        $("#ddlJobUrgency").val() +
        "<h4 class='pt-3'>Performed Remotely" +
        strStep2Markup +
        "</h4>" +
        $("#ddlPerformedRemotely").val() +
        "<h4 class='pt-3'>Job Location" +
        strStep2Markup +
        "</h4>" +
        $("#ddlJobLocation").val() +
        "<h4 class='pt-3'>Job Type" +
        strStep2Markup +
        "</h4>" +
        $("#ddlJobType").val() +
        "<h4 class='pt-3'>Job Schedule Type" +
        strStep2Markup +
        "</h4>" +
        strSchedule0 +
        strSchedule1 +
        "" +
        "" +
        "<hr class='mx-n4 my-4'>" +
        "" +
        "" +
        "<h4 class='pt-3'>Pay" +
        strStep3Markup +
        "</h4>" +
        strPay1 +
        "<h4 class='pt-3'>Supplemental Pay" +
        strStep3Markup +
        "</h4>" +
        strSupplementalPay1 +
        "<h4 class='pt-3'>Benefits" +
        strStep3Markup +
        "</h4>" +
        strBenefits1 +
        "" +
        "" +
        "<hr class='mx-n4 my-4'>" +
        "" +
        "" +
        "<h4 class='pt-3'>Screening Questions" +
        strStep4Markup +
        "</h4>" +
        strScreening1 +
        "" +
        "" +
        "" +
        "" +
        "" +
        "</div>" +
        ""+
        ""+
        ""+
        "<hr class='mx-n4 my-4'>" +
        ""+
        ""+
        ""+
        "";

      $("#divReviewContents").html(strMarkup);

      if (blnHasSchedule) {
        $(
          "#tabPreviewCustomSchedule>tbody>tr>td>div>input.proxy-schedule,#tabPreviewCustomSchedule>tbody>tr>td>input.proxy-schedule,#tabPreviewCustomSchedule>tbody>tr>td>div>div>input.proxy-schedule"
        ).each(function (index, element) {
          $(element).prop("disabled", true);
        });
      }
    }
  });
})();
