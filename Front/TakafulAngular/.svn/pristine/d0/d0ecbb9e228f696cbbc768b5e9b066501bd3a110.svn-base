$(document).ready(function () {
    // niceScroll
    // $("body").niceScroll({ enablescrollonselection: true, });
    // $(".sidebar").niceScroll({ enablescrollonselection: true, });
    // $(".msg-view").niceScroll({ enablescrollonselection: true, });
    // $(".offcanvas").niceScroll({ enablescrollonselection: true, });
    // datapicker rang
    $(function () {
        var dateFormat = "mm/dd/yy",
            from = $(".from")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    changeYear: true
                })
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $(".to").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                changeYear: true
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });

        function getDate (element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });
    //datapicker
    $(function () {
        $(".datepicker").datepicker();
    });
    $('.chosen-single').select2({
        width: '100%'
    });
    // select2 multiselection
    $('.chosen-multiple').select2({
        width: '100%',
        multiple: true,
        dropdownAutoWidth: true,
        allowClear: true,
        closeOnSelect: false,
        tags: false,
    });
    //  result of selected items
    $('.chosen-multiple').on('select2:close', function (evt) {
        var uldiv = $(this).siblings('span.select2').find('ul')
        var count = uldiv.find('li').length - 1;
        uldiv.html("<li>" + count + " items selected</li>")
    });
    // select2 multiselection
    $('.chosen-multiple-days').select2({
        width: '100%',
        multiple: true,
        dropdownAutoWidth: true,
        allowClear: true,
        closeOnSelect: false,
        tags: false,
    });
    //  result of selected items
    // $('.chosen-multiple-pos').on('select2:close', function (evt) {
    //     var uldiv = $(this).siblings('span.select2').find('ul')
    //     var count = uldiv.find('li').length - 1;
    //     uldiv.html("<li>" + count + " items selected</li>")
    // });
    //
    function formatText (icon) {
        return $('<span><i class="fas ' + $(icon.element).data('icon') + '"></i> ' + icon.text + '</span>');
    };
    $('.select2-icon').select2({
        width: "100%",
        minimumResultsForSearch: -1,
        templateSelection: formatText,
        templateResult: formatText,
        closeOnSelect: true,
    });
});
// side menu
$(document).ready(function () {
    // //side menu
    // $(document).on('click', '.sidebar-item li a', function () {
    //     if ($("ul").hasClass('has-sub-menu')) {
    //         $("ul.has-sub-menu").siblings("a").addClass('s-sub');
    //         $("ul.has-sub-menu li.selected").parents("ul").siblings("a").addClass('active');
    //     };
    //     //
    //     if ($(".side-menu h3 .pin-menu").not('pined')) {
    //         $(".page-content").removeClass("ml-menushow");
    //     };
    // });
    // change page-content padding in mobile view
    $(document).on('click', '.navbar-toggler', function () {
        $(".page-content").toggleClass("pt-0");
    });
    //close tags
    $(document).on('click', '.tag-close', function () {
        $(this).parent(".tag").remove();
        //  has-filters
        if (!$(".filter-tags").children('.tag').length) {
            $("a.btn-filter").removeClass("has-filters");
        }
    });
    //----------------
    $(".side-menu h3").addClass("pin-menu");
    // $(document).on('click', '.pin-menu', function () {
    //     $(this).toggleClass("pined");
    //     $(this).parent(".dropdown-menu").toggleClass("show");
    //     $(".page-content").toggleClass("ml-menushow");
    // });
    // ***************** by yousef ******************/
    /***** Select Menu size *****/
    $('#MenuSize').on('change', function () {
        var MenuSize = $('#MenuSize').find(":selected").val();
        $('body').removeClass("menu-lg menu-sm pinned-menu").addClass(MenuSize);
        if ($("body").hasClass("pinned-menu")) {
            $(".sidebar-item .dropdown-toggle").addClass("show");
            $(".sidebar-item .dropdown-menu").addClass("show");
        }
        //$('body').attr('data-menu', selectedTheme);
    });
    $(".toggle-menu").on("click", function () {
        $(this).toggleClass("opened");
        $(this).closest("body").toggleClass("menu-lg");
        if ($("body").hasClass("menu-lg")) {
            $(".first-menu .has-sub-menu").addClass("dropdown-menu");
        } else {
            $(".first-menu .has-sub-menu").removeClass("dropdown-menu");
        }
    });
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });
    $(".pin-menu").on("click", function () {
        // $(this).closest(".dropdown-menu ").toggleClass("show");
        $(this).closest("body").toggleClass("pinned-menu");
        // $('.sidebar-item .dropdown-menu').on('hide.bs.dropdown', function (e) {
        //     if (e.clickEvent) {
        //         e.preventDefault();
        //     }
        // })
    });
});
// select theme&menu size
$(document).ready(function () {
    /***** Select Theme size *****/
    $('#themeSelector').on('change', function () {
        var selectedTheme = $('#themeSelector').find(":selected").val();
        $('body').removeClass("DMSBlue DMSBlueBlue New").addClass(selectedTheme);
        //$('body').attr('data-theme', selectedTheme);
        //   show theme color selector
        if ($(this).val() == 'NewDMS') {
            $("#themeColor").removeClass("d-none");
            // change logo based on theme
            // $('.navbar-brand > ').attr('src', 'assets/images/logo.png');
        } else {
            $("#themeColor").addClass("d-none");
            // change logo based on theme
            // $('.navbar-brand > ').attr('src', 'assets/images/logo-light.png');
        }
    });
    //
    $('#themeColor').on('change', function () {
        if ($(this).val() == 'theme-green') {
            $(':root').css('--filter-img', 'grayscale(100%) brightness(82%) sepia(9%) hue-rotate(46deg) saturate(3122%) contrast(85%)');
            $(':root').css('--appColor', '#6ba22e');
        };
        if ($(this).val() == 'theme-red') {
            $(':root').css('--filter-img', 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)');
            $(':root').css('--appColor', '#b43740');
        };
        if ($(this).val() == 'theme-blue') {
            $(':root').css('--filter-img', 'grayscale(100%) brightness(89%) sepia(10%) hue-rotate(180deg) saturate(4567%) contrast(91%)');
            $(':root').css('--appColor', '#365392');
        };
        if ($(this).val() == 'theme-yellow') {
            $(':root').css('--filter-img', 'grayscale(100%) brightness(94%) sepia(35%) hue-rotate(11deg) saturate(4027%) contrast(91%)');
            $(':root').css('--appColor', '#f5a71c');
        }
    });
    /***** Select Menu size *****/
    $('#MenuSize').on('change', function () {
        var MenuSize = $('#MenuSize').find(":selected").val();
        $('body').removeClass("menu-lg menu-sm pinned-menu").addClass(MenuSize);
        if ($("body").hasClass("pinned-menu")) {
            $(".sidebar-item .dropdown-toggle").addClass("show");
            $(".sidebar-item .dropdown-menu").addClass("show");
        }
        //$('body').attr('data-menu', selectedTheme);
    });
    //   #themeColor
});
//  edit table
$(document).ready(function () {
    //  select rows in table (multiple rows)
    $('.select-multiple-rows tbody').on('click', 'tr', function () {
        //Row selection (multiple rows)
        $(this).toggleClass('selected');
    });
    //  select row in table (single row)
    $('.select-single-row tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        $('tbody tr').not(this).removeClass('selected');
    });
    //  // select one row with checkbox
    // $('.check table tbody').on('click', 'tr', function () {
    //     if ($(this).hasClass("selected")) {
    //         $(this).removeClass('selected');
    //         $(this).find("input").prop('checked', false);
    //     } else {
    //         $(this).addClass('selected');
    //         $(this).find("input").prop('checked', true);
    //         //  select one row
    //         //            $('. table tbody tr').not(this).removeClass('selected');
    //         //            $('. table tbody tr').not(this).find("input").prop('checked', false);
    //     }
    // });
    /****************** Edit/Save Row ***************/
    // Row inline editing
    $(document).on('click', '.row-edit', function () {
        rowInlineEditing($(this).parent().parent('tr'));
        //console.log($(this).parent().parent('tr'));
    });
    // Row inline Add
    $(document).on('click', '.addRow', function () {
        var newRow = $(this).parent().parent().find('.new-row');
        //$('.addRow').hide();
        newRow.toggleClass('active');
        newRow.children('.row-inline-editable').addClass("active");
        newRow.children('.row-inline-editable').each(function (index, value) {
            var text = $(this).children("input[type='text']").val("");
            var checkbox = $(this).children("input[type='checkbox']").val("");
            var select = $(this).children("select").removeAttr('checked');
        });
    });
    // Row inline Save After Adding
    $(document).on('click', '.row-inline-add', function () {
        $('.addRow').show();
        var newRow = $(this).parent().parent();
        var oldRow = newRow.prev();
        rowInlineEditing(newRow);
        var newRowcontent = newRow.clone();
        newRowcontent.removeClass("new-row active").children().removeClass("active").first().children(".row-inline-add").removeClass("row-inline-add").addClass("row-inline-edit");
        //newRowcontent.find(".chosen-container").remove();
        //newRowcontent.find(".chosen ").attr('style', '').removeClass('active');
        newRow.before(newRowcontent);
        newRow.removeClass("active main").children().first().children(".fa-pencil-alt.row-inline-add").removeClass("fa-pencil-alt").addClass("fa-floppy-disk");
        //updateChosen();
    });
    // Row inline Editing Function
    function rowInlineEditing (element) {
        var editIcon = element.children().last().children().first();
        //Editing
        if (editIcon.hasClass('fa-pencil-alt')) {
            editIcon.removeClass("fa-pencil-alt").addClass("fa-floppy-disk");
            element.children('.row-inline-editable').addClass("active");
        }
        //Saving
        else if (editIcon.hasClass('fa-floppy-disk')) {
            //console.log("Save Mode");
            editIcon.removeClass("fa-floppy-disk").addClass("fa-pencil-alt");
            element.children('.row-inline-editable').each(function (index, value) {
                var value = $(this).children("span").text();
                var span = $(this).children("span");
                var text = $(this).children("input[type='text']");
                var password = $(this).children("input[type='password']");
                var checkbox = $(this).children("input[type='checkbox']");
                var select = $(this).children("select");
                if (select.length) {
                    var input = select;
                    var value = input.val();
                    if (value) {
                        span.text(value);
                    } else {
                        span.text("");
                    }
                    //console.log("Select: "+ value);
                } else if (text.length) {
                    var input = text;
                    var value = input.val();
                    span.text(value);
                    //console.log("input: "+ value);
                } else if (password.length) {
                    var input = password;
                    var value = input.val();
                    span.text(value);
                    //console.log("input: "+ value);
                } else if (checkbox.length) {
                    var input = checkbox;
                    var value = input.val();
                    //console.log("checkbox: "+ value);
                    if (checkbox.is(':checked')) {
                        // span.removeClass("fa-times text-danger");
                        // span.addClass("fa-check text-success")
                        $(this).find("span i").removeClass("fa-times");
                        $(this).find("span i").addClass("fa-check")
                    } else {
                        // span.removeClass("fa-check text-success");
                        // span.addClass("fa-times text-danger")
                        $(this).find("span i").removeClass("fa-check");
                        $(this).find("span i").addClass("fa-times")
                    }
                }
            });
            element.children('.row-inline-editable').removeClass("active");
            // $("input[type=password]").attr('readonly', true);
        }
    }
    // Cell inline editing
    $("inline-editable span").click(function (e) {
        inlineEditing($(this).parent());
    });
    // Cell inline Editing Function Used for Row in Line editing
    function inlineEditing (element) {
        var value = element.children("span").text();
        var span = element.children("span");
        var text = element.children("input");
        var select = element.children("select");
        if (select.length) {
            var input = select;
        }
        if (text.length) {
            var input = text;
        }
        element.addClass("active");
        input.val(value);
        $(input).focus();
        $(input).blur(function () {
            //Send to DB and if success
            var value = input.val();
            span.text(value);
            $(element).removeClass("active");
        });
    }
    // delete row
    $('.delete-row').click(function () {
        if (confirm("You will delete the row ! Are you sure ?") == true) {
            $(this).closest('tr').remove();
        } else {
            return;
        }
    });
});

// Start DataTable Functions

// Data table Search
function showsearch (Me, e) {
    // alert(1);
    $(Me).parent().toggleClass("searching");
    $(Me).siblings("input,select").focus();
    $(Me).siblings("input,select").val("");
    $(Me).siblings("input,select").trigger("change");
    /*table.columns().search("" ).draw();*/
    disablesort(Me, e);
}

function disablesort (Me, e) {
    if (!e)
        e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //IE8 and Lower
    else {
        e.cancelBubble = true;
    }
}
// Apply the search
function FilterDatatable (table) {
    var text = " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><input type=\"text\" class=\"form-control searchField\"  onclick=\"disablesort(this)\" />";
    var select = " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><select class=\"form-control searchField\" onclick=\"disablesort(this)\"><option value=\"\"></option></select>";
    var select2 = " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><select class=\"form-control single-select searchField\" onclick=\"disablesort(this)\"><option value=\"\"></option></select>";

    $(table.table().header()).find('.searchableTh').each(function (index, value) {
        var searchtype = $(this).data('searchtype');
        //alert(searchtype);
        var that = this;
        if (searchtype === 'text') {
            $(this).append(text);

        } else if (searchtype === 'select') {
            $(this).append(select);
            table.column(this).cache('search').sort().unique().sort().each(function (d, j) {
                if (d !== "") {
                    $(that).find('select').append('<option value="' + d + '">' + d + '</option>')
                }

            });

        }

    });



    table.columns().every(function () {
        var that = this;

        $('input', this.header()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });

        $('select', this.header()).on('change', function () {

            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });

    });
}

// Main DataTable Function
function dataTablizer (table) {
    var dom = table.data('dom'),
        colReorder = table.data('colreorder'),
        paging = table.data('paging'),
        pageLength = table.data('pagelength'),
        ordering = table.data('ordering'),
        nonOrderable = table.data('nonorderable'); //No Order Class
    //nonOrderable    = $.parseJSON(table.attr('data-nonorderable'));

    if (dom === undefined) {
        dom = 'rtlip';
    }
    if (colReorder === undefined) {
        colReorder = true;
    }
    if (paging === undefined) {
        paging = false;
    }
    if (pageLength === undefined) {
        pageLength = 10;
    }
    if (ordering === undefined) {
        ordering = true;
    }
    if (nonOrderable === undefined) {
        nonOrderable = 'nonorderable';
    }
    //Hide Pagination if not rows are less or equal to item per page
    if (paging) {
        var rows = table.find('tbody').find('tr').length;

        if (rows <= parseInt(pageLength)) {
            dom = dom.replace('p', '').replace('l', '');

        }
    }
    var tabelizedTable = $(table).DataTable({
        dom: dom,
        "stripeClasses": [],
        pagingType: "full_numbers",
        lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"]
        ],
        colReorder: colReorder,
        paging: paging,
        pageLength: pageLength,
        ordering: ordering,
        order: [],
        bDestroy: true,
        info: false,
        "autoWidth": false,
        'columnDefs': [{
            'targets': nonOrderable,
            'orderable': false
        }]
    });
    return tabelizedTable
}

// End DataTable Functions

//  datatable By Reham
$(document).ready(function () {
    //   simple table
    var tableSetup = setupTabel();

    function setupTabel () {
        var table = $('#setupTabel table').DataTable({
            /* Codes
              {filter} : f
              {length} : l
              {processing} : r
              {table} : t
              {information} : i
              {pagination} : p
        */
            "dom": 'Btpil',
            "stateSave": false,
            "scrollCollapse": false,
            "info": true,
            "paging": true,
            "responsive": true,
            "ordering": true,
            "colReorder": false,
            buttons: [{
                extend: 'copy',
                className: 'btn-sm'
            },
            {
                extend: 'csv',
                className: 'btn-sm'
            },
            {
                extend: 'excel',
                className: 'btn-sm'
            },
            {
                extend: 'pdf',
                className: 'btn-sm'
            },
            {
                extend: 'print',
                className: 'btn-sm'
            }
            ],
            columnDefs: [{
                className: 'select-checkbox',
                targets: 0,
            }],
            select: {
                style: 'multi', //multi - os - single
                selector: 'td:first-child',
            },
        });
        return table;
    };
    //  sticky Header
    var tablestickyHeader = stickyHeaderTabel();

    function stickyHeaderTabel () {
        var table = $('#stickyHeader table').DataTable({
            dom: 'tpil',
            filter: false,
            "info": false,
            "responsive": true,
            "ordering": true,
            "colReorder": true,
            scrollY: '50vh',
            scrollCollapse: true,
            paging: false,
            order: [
                [2, 'asc']
            ],
            rowGroup: {
                dataSrc: 2
            }
        });
        return table;
    };
    // fixed Column& header
    $('#fixedColumn table').DataTable({
        // dom: 'tpl',
        filter: false,
        scrollY: '50vh',
        scrollX: true,
        info: false,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
            left: 2,
        },
        columnDefs: [{
            width: '30%',
            targets: 0
        }],
        // fixedColumns: true
    });
    //   colVisibility
    var colVisibilitylexHeader = colVisibilityTabel();

    function colVisibilityTabel () {
        var table = $('#colVisibility table').DataTable({
            "dom": 'Btpil',
            "stateSave": false,
            "scrollCollapse": false,
            "info": true,
            "paging": true,
            "responsive": true,
            "ordering": true,
            "colReorder": false,
            // scrollY: '50vh',
            // scrollX: true,
            // scrollCollapse: true,
            // buttons: ['colvis'],
            buttons: [{
                extend: 'colvis',
                text: '<i class="fa fa-eye"></i> Hide & Show Column',
                // class: 'colvis',
                config: {
                    left: 1,
                    // right: 1
                }
            }]
        });
        return table;
    };
});