/**
 * App user list
 */

"use strict";

// Datatable (jquery)
$(function () {
  var dtUserTable = $(".datatables-users"),
    statusObj = {
      1: { title: "Pending", class: "bg-label-warning" },
      2: { title: "Active", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-secondary" },
    };

  var userView = "UserDetails.php";

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetsPath + "/json/Custom-ClientUser-List.json", // JSON file to add data
      columns: [
        // columns according to JSON
        { data: "" },
        { data: "full_name" },
        { data: "role" },
        { data: "current_plan" },
        { data: "billing" },
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
          // User full name and email
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $id = full["id"],
              $name = full["full_name"],
              $email = full["email"],
              $image = full["avatar"];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' +
                assetsPath +
                "img/avatars/" +
                $image +
                '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = [
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "primary",
                "secondary",
              ];
              var $state = states[stateNum],
                $name = full["full_name"],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (
                ($initials.shift() || "") + ($initials.pop() || "")
              ).toUpperCase();
              $output =
                '<span class="avatar-initial rounded-circle bg-label-' +
                $state +
                '">' +
                $initials +
                "</span>";
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-3">' +
              '<a href="' +
              userView +
              "?id=" +
              $id +
              '">' +
              $output +
              "</a>" +
              "</div>" +
              "</div>" +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              userView +
              "?id=" +
              $id +
              '" class="text-body text-truncate"><span class="fw-semibold">' +
              $name +
              "</span></a>" +
              '<small class="text-muted">' +
              $email +
              "</small>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $role = full["role"];
            return (
              "<span class='text-truncate d-flex align-items-center'>" +
              $role.replace(/\_/g, " ") +
              "</span>"
            );
          },
        },
        {
          // Plans
          targets: 3,
          visible: false,
          render: function (data, type, full, meta) {
            var $plan = full["current_plan"];

            return '<span class="fw-semibold">' + $plan + "</span>";
          },
        },
        {
          // Billing
          targets: 4,
          visible: false,
          render: function (data, type, full, meta) {
            var $plan = full["billing"];

            return '<span class="fw-semibold">' + $plan + "</span>";
          },
        },
        {
          // User Status
          targets: 5,
          render: function (data, type, full, meta) {
            var $status = full["status"];
            var $strButtonsMarkup = "";

            if (statusObj[$status].title == "Pending")
            {
                //$strButtonsMarkup += " <button class='btn btn-primary btn-xs'>Approve</button> <button class='btn btn-danger btn-xs'>Reject</button>";
            }

            return (
              '<span class="badge ' +
              statusObj[$status].class +
              '">' +
              statusObj[$status].title +
              "</span>" +
              $strButtonsMarkup
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "View",
          visible: false,
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<a href="' +
              userView +
              '" class="btn btn-sm btn-icon"><i class="bx bx-show-alt"></i></a>'
            );
          },
        },
      ],
      order: [[3, "asc"]],
      dom:
        '<"row mx-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        ">t" +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        ">",
      language: {
        sLengthMenu: "_MENU_",
        search: "Search",
        searchPlaceholder: "Search..",
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle mx-3',
          text: '<i class="bx bx-upload me-2"></i>Export',
          buttons: [
            {
              extend: 'print',
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: 'dropdown-item',
              exportOptions: { columns: [2, 3, 4, 5] }
            },
            {
              extend: 'csv',
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [2, 3, 4, 5] }
            },
            {
              extend: 'excel',
              text: 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [2, 3, 4, 5] }
            },
            {
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [2, 3, 4, 5] }
            },
            {
              extend: 'copy',
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [2, 3, 4, 5] }
            }
          ]
        },
        {
          text: '<i class="bx bx-plus me-0 me-sm-2"></i><span class="d-none d-lg-inline-block">Add New User</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#divModalAddUser'
          }
        }
      ],
      // For responsive popup
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

(function () {
  // On edit role click, update text
  var roleEditList = document.querySelectorAll(".role-edit-modal"),
    roleAdd = document.querySelector(".add-new-role"),
    roleTitle = document.querySelector(".role-title");

  if (roleAdd != null) {
    roleAdd.onclick = function () {
      roleTitle.innerHTML = "Add New Role"; // reset text
    };
  }

  if (roleEditList) {
    roleEditList.forEach(function (roleEditEl) {
      roleEditEl.onclick = function () {
        roleTitle.innerHTML = "Edit Role"; // reset text
      };
    });
  }
})();
