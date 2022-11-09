/**
 * DataTables Basic
 */

"use strict";

let fv, offCanvasEl;

// datatable (jquery)
$(function () {
  //var //dt_basic_table = $('.datatables-basic'),
  var dt_basic_table = $(".datatables-Jobs"),
    dt_complex_header_table = $(".dt-complex-header"),
    dt_row_grouping_table = $(".dt-row-grouping"),
    dt_multilingual_table = $(".dt-multilingual"),
    dt_basic;

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic = dt_basic_table.DataTable({
      ajax: assetsPath + "/json/table-datatable-open.json",
      // ajax: '../assets/json/table-datatableBackup.json',
      columns: [
        { data: "" },
        { data: "id" },
        { data: "job_name" },
        { data: "submission" },
        { data: "Interview" },
        { data: "offer" },
        { data: "hire" },
        { data: "last_activity" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          targets: 2,
          searchable: true,
          visible: true,
          render: function (data, type, full, meta) {
            var $name = full["job_name"];
            var $status = full["status"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              '<a href="Interviews.php?jn=' +
              $name +
              '&status=' +
              $status + '">' +
              $name +
              "</a>" +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 3,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            var $Submission = full["submission"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $Submission +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 4,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            var $interview = full["interview"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $interview +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 5,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            var $offer = full["offer"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $offer +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 6,
          responsivePriority: 4,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            var $hire = full["hire"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $hire +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 7,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            var $last_activity = full["last_activity"];

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<i class="la la-clock-o"></i><span class="emp_name text-truncate">' +
              $last_activity +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          targets: 8,
          orderable: true,
          searchable: true,
          render: function (data, type, full, meta) {
            var $status = full["status"];
            var $strStatusMarkup = "";
            if ($status == "Archived") {
              $strStatusMarkup = "<span class='badge bg-secondary'>" + $status + "</span>";
            }
            else if ($status == "Cancelled") {
              $strStatusMarkup = "<span class='badge bg-secondary'>" + $status + "</span>";
            }
            else if ($status == "Closed") {
              $strStatusMarkup = "<span class='badge bg-primary'>" + $status + "</span>";
            }
            else if ($status == "In Progress") {
              $strStatusMarkup = "<span class='badge bg-warning'>" + $status + "</span>";
            }
            else {
              $strStatusMarkup = $status;
            }


            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<i class="la la-clock-o"></i><span class="emp_name text-truncate">' +
              $strStatusMarkup +
              "</span>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<ul class="dropdown-menu dropdown-menu-end">' +
              '<li><a href="javascript:;" class="dropdown-item">Details</a></li>' +
              '<li><a href="javascript:;" class="dropdown-item">Close</a></li>' +
              '<li><a href="javascript:;" class="dropdown-item">Cancel</a></li>' +
              '<li><a href="javascript:;" class="dropdown-item">Archive</a></li>' +
              '<div class="dropdown-divider"></div>' +
              '<li><a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a></li>' +
              "</ul>" +
              "</div>"
            );
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f<"status dataTables_filter mb-3">>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-primary dropdown-toggle me-2",
          text: '<i class="bx bx-export me-sm-2"></i> <span class="d-none d-sm-inline-block">Export</span>',
          buttons: [
            {
              extend: "print",
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "csv",
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "excel",
              text: "Excel",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "pdf",
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "copy",
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
          ],
        },
        {
          text: '<i class="bx bx-plus me-sm-2"></i> <span class="d-none d-sm-inline-block">New Request</span>',
          className: "create-new btn btn-primary",
          action: function (e, dt, node, config) {
            location = "NewRequest.php";
          },
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
      initComplete: function () {
        // Adding role filter once table initialized
        this.api()
          .columns(8)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-select"><option value=""> Select Status </option></select>'
            )
              .appendTo('.status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
              });
          });
      }
    });
    $("div.head-label").html('<h5 class="card-title mb-0">My Requests</h5>');

    /*
    var filteredData = dt_basic
      .column(8)
      .data()
      .filter(function (value, index) {
        return value == "In Progress" ? true : false;
      });
      dt_basic = filteredData;
      */

  }





  /*
  // Add New record
  // ? Remove/Update this code as per your requirements
  var count = 101;
  // On form submit, if form is valid
  fv.on("core.form.valid", function () {
    var $new_name = $(".add-new-record .dt-full-name").val(),
      $new_post = $(".add-new-record .dt-post").val(),
      $new_email = $(".add-new-record .dt-email").val(),
      $new_date = $(".add-new-record .dt-date").val(),
      $new_salary = $(".add-new-record .dt-salary").val();

    if ($new_name != "") {
      dt_basic.row
        .add({
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: "$" + $new_salary,
          status: 5,
        })
        .draw();
      count++;

      // Hide offcanvas using javascript method
      offCanvasEl.hide();
    }
  });

  // Delete Record
  $(".datatables-basic tbody").on("click", ".delete-record", function () {
    dt_basic.row($(this).parents("tr")).remove().draw();
  });

  */

  // Complex Header DataTable
  // --------------------------------------------------------------------

  if (dt_complex_header_table.length) {
    var dt_complex = dt_complex_header_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "full_name" },
        { data: "email" },
        { data: "city" },
        { data: "post" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
    });
  }

  // Row Grouping
  // --------------------------------------------------------------------

  var groupColumn = 2;
  if (dt_row_grouping_table.length) {
    var groupingTable = dt_row_grouping_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "city" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        { visible: false, targets: groupColumn },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      order: [[groupColumn, "asc"]],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: "current" }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: "current" })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="8">' + group + "</td></tr>"
                );

              last = group;
            }
          });
      },
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });

    // Order by the grouping
    $(".dt-row-grouping tbody").on("click", "tr.group", function () {
      var currentOrder = groupingTable.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === "asc") {
        groupingTable.order([groupColumn, "desc"]).draw();
      } else {
        groupingTable.order([groupColumn, "asc"]).draw();
      }
    });
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = "German";
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/" + lang + ".json",
      },
      displayLength: 7,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      lengthMenu: [7, 10, 25, 50, 75, 100],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });
  }

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});
