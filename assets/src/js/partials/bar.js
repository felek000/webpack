export default {
  sayBar(){
    alert('bar');
  },
  dumyyy(){
    /** otwiera kalendarz dodaje do listy noclegow kolejny element*/
    $(document).ready(function () {
      /** init */
      var notyfi = new Notify();
      initDatepickerAaccommodation();
    
      /** dodanie nowej daty do noclegow*/
      $('body .js-datepicker-add-accommodation').datepicker()
      .on('changeDate', function (e) {
      
        var selectedDate = moment(e.date);
        var inputs = $('.js-filters-list-accommodation').find('input');
        var dateExist = false;
        if (inputs.length > 0) {
          $.each(inputs, function (key, input) {
            var dateCompare = moment(input.value, 'DD.MM.YYYY');
            if (dateCompare.toString() == selectedDate.toString()) {
              dateExist = true;
              return false;
            }
          });
        }
        if (dateExist) {
          $(this).datepicker('update', '');
          return;
        }
        var putDateAtEnd = true;
        var elementToPutBefore;
      
        $.each(inputs, function (key, input) {
          var dateCompare = moment(input.value, 'DD.MM.YYYY');
          if (selectedDate < dateCompare) {
            elementToPutBefore = input;
            putDateAtEnd = false;
            return false;
          }
        });
      
        selectedDate = selectedDate.format('DD.MM.YYYY');
        var stringToInsert = '<div class="filters-list-item"><input class="hide" type="text" name="days[]" value="' + selectedDate + '"><div class="filters-list-item-content">' + selectedDate + '</div><a href="javascript:void(0)" class="js-remove-accommodation-day"><i class="material-icons"></i></a></div>';
      
        if (putDateAtEnd) {
          $('.js-filters-list-accommodation').append(stringToInsert);
        }
        else {
          // console.log($(elementToPutBefore).parent());
          $(stringToInsert).insertBefore($(elementToPutBefore).parent());
        }
        $(this).datepicker('update', '');
      });
    
      /** otwarcie kalendarza na plus*/
      $('body').on('click', '.js-list-dates-add', function () {
        // console.log($(this).find('input'));
        $(this).find('input').focus();
      });
    
      /** akcja na dodanie hotela */
      $(".js-select-simple-search-hotel").on('select2:select', function (e) {
        // console.log('tutaj');
        var select_val = $(e.currentTarget).val();
        var select = $(this);
      
      
        // console.log(URL);
        // console.log( $(this).find('option[value="'+select_val+'"]') );
      
        axios.get('/api/hotel/' + select_val)
        .then(function (response) {
          redirectOnError(response);
          var data = response.data.data;
          // console.log(data);
        
          var rooms = '';
          if(data.rooms.length == 0){
            rooms += '<tr><td colspan="4">Brak danych</td></tr>'
          };
          data.rooms.forEach(function (el) {
            var hotelRoomQuantity = 0;
          
            if(el.hotelRoomQuantity) {
              hotelRoomQuantity = el.hotelRoomQuantity;
            }
            rooms += '<tr>\n' +
                '                                                                <td>' + el.hotelRoomDetails.hotelRoomTypeName + '</td>\n' +
                '                                                                <td>' + hotelRoomQuantity + '</td>\n' +
                '                                                                <td>\n' +
                '                                                                    <div class="form-group">\n' +
                '                                                                        <input type="hidden" name="hotels[' + data.id + '][rooms][' + el.id + '][id]" value="' + el.id + '">\n' +
                '                                                                        <input type="number" name="hotels[' + data.id + '][rooms][' + el.id + '][rented]" class="form-control js-used-space-item" min="0" value="" data-hotel-room-quantity="' + el.hotelRoomDetails.hotelRoomTypePlaces + '" placeholder="Ilość">\n' +
                '                                                                        <input type="hidden" name="hotels[' + data.id + '][hotelId]" value="' + data.id + '">\n' +
                '                                                                    </div>\n' +
                '                                                                </td>\n' +
                '                                                                <td>\n' +
                '                                                                    <div class="form-group">\n' +
                '                                                                        <input type="text" name="hotels[' + data.id + '][rooms][' + el.id + '][cost]" class="form-control js-budget" value="" placeholder="Kwota">\n' +
                '                                                                    </div>\n' +
                '                                                                </td>\n' +
                '                                                            </tr>';
          });
          select.find('option[value="' + select_val + '"]').prop('disabled', true);
          select.find('option:eq(0)').prop('selected', true);
          select.select2({
            width: 'resolve'
          });
          var quantityPlaces = data.quantityPlaces || 0
          var hotelTemplate = '<div class="hotel-container mt-1 js-hotel-container-el">\n' +
              '                                                    <div class="hotel-container-header d-flex">\n' +
              '                                                        <div class="css-grid-2-3">\n' +
              '                                                            <p class="m-0"><label class="hotel-header-name">' + data.name + '<span> (' + ( (data.cityName == null) ? ('Do uzupełnienia') : (data.cityName) ) + ')</span></label></p>\n' +
              '                                                            <p class="m-0">Ilość miejsc noclegowych: <strong>' + quantityPlaces + '</strong></p>\n' +
              '                                                        </div>\n' +
              '                                                        <div class="css-grid-1-3 text-right"><a href="javascript:void(0)" class="btn  btn-remove js-remove-hotel-from-accommodation-list" data-id-hotel="' + data.id + '">Usuń<span class="close"><svg xmlns="http://www.w3.org/2000/svg" width="8.219" height="8.219" viewBox="0 0 8.219 8.219">\n' +
              '  <metadata><?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>\n' +
              '      <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        ">\n' +
              '   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n' +
              '      <rdf:Description rdf:about=""/>\n' +
              '   </rdf:RDF>\n' +
              '</x:xmpmeta>\n' +
              '      <?xpacket end="w"?></metadata>\n' +
              '<defs>\n' +
              '    <style>\n' +
              '    </style>\n' +
              '  </defs>\n' +
              '  <path id="close-small-white" class="cls-1" d="M5.97,5L8.916,7.945a0.686,0.686,0,1,1-.97.97L5,5.97,2.054,8.916a0.686,0.686,0,1,1-.97-0.97L4.03,5,1.084,2.054a0.686,0.686,0,0,1,.97-0.97L5,4.03,7.945,1.084a0.686,0.686,0,0,1,.97.97Z" transform="translate(-0.906 -0.906)"/>\n' +
              '</svg>\n' +
              '</span></a></div>\n' +
              '                                                    </div>\n' +
              '                                                    <div class="hotel-container-content">\n' +
              '                                                        <table class="table table-css">\n' +
              '                                                            <thead>\n' +
              '                                                            <tr>\n' +
              '                                                                <th><label>Typ pokoju</label></th>\n' +
              '                                                                <th><label>Oferta hotelu</label></th>\n' +
              '                                                                <th><label>Zakupione pokoje</label></th>\n' +
              '                                                                <th><label>Koszt miejsca w pokoju za noc</label></th>\n' +
              '                                                            </tr>\n' +
              '                                                            </thead>\n' +
              '                                                            <tbody>\n' +
              rooms +
              '                                                            </tbody>\n' +
              '                                                        </table>\n' +
              '                                                    </div>\n' +
              '                                                </div>';
          $('.js-hotel-container').append(hotelTemplate);
          maskInputAmmount();
        })
        .catch(function (error) {
          console.log(error);
          alert('Bład podczas pobierania danych');
        });
      });
    
    
      /** usuniecie dnia z listy noclegow*/
      $('.js-filters-list-accommodation').on('click', '.js-remove-accommodation-day', function () {
        var dialog = new Dialog();
        var that = $(this);
        var callbackTrue = function(){
          that.closest('.filters-list-item').fadeTo('slow', 0, function () {
            $(this).remove();
          });
        };
        dialog.showConfirm('Czy chcesz usunąć element','Pamiętaj że należy zapisać zmiany.','confirm',callbackTrue,function(){})
      });
    
    
      /** usuniecie hotela z listy*/
      $('body').on('click', '.js-remove-hotel-from-accommodation-list', function () {
        var dialog = new Dialog();
        var that = $(this);
        var callbackTrue = function () {
          var id = that.data('idHotel');
          var select = $('.js-select-simple-search-hotel');
          that.closest('.js-hotel-container-el').slideUp(100, function () {
            select.find('option[value="' + id + '"]').prop('disabled', false);
            select.find('option:eq(0)').prop('selected', true);
            select.select2({
              width: 'resolve'
            });
            $(this).remove();
            updateStatusAccommodationCount();
          });
        };
        dialog.showConfirm('Czy chcesz usunąć element','Pamiętaj że należy zapisać zmiany.','confirm',callbackTrue,function(){})
      
      });
    
    
      /** przeliczanie miejsca noclegowe potrzebne*/
      $('.js-hotel-container').on('change', '.js-used-space-item', function () {
        updateStatusAccommodationCount();
      });
    
    
      /** build bredcrumbs*/
      var buildBdredcrumbs = function (elContainer, conferenceId, departmentId, areaId, bredcrumbsData) {
        var bredcrumbs = bredcrumbsData;
        var templateConferenceEl = '';
        // console.log(elContainer,conferenceId,departmentId,areaId,bredcrumbsData);
        bredcrumbs.forEach(function (el, index) {
          templateConferenceEl += '<div class="breadcrumb-user-search-el js-conference-user-search d-flex flex-align-center" data-conference-id="' + conferenceId + '" data-department-id="' + departmentId + '" ' + ( (index == 0) ? ("") : ('data-area-id="' + el.area_id + '"') ) + '>\n' +
              '                                            <div>\n' +
              '                                                <span class="breadcrumb-user-search-el-title font-500 d-block">' + el.header + '</span>\n' +
              '                                                <span class="breadcrumb-user-search-el-subtitle d-block subtitle">' + el.text + '</span>\n' +
              '                                            </div>\n' +
              '                                            <div class="breadcrumb-user-search-el-arrow">\n' +
              '                                                <i class="material-icons">&#xE315;</i>\n' +
              '                                            </div>\n' +
              '                                        </div>';
        });
        $(elContainer).find('.js-breadcrumb-user-search-list').html(templateConferenceEl);
      };
      /** build table rows Current*/
      var generateTableRowsCurrent = function (conferenceId, departmentId, rowCurrentData) {
        var current = rowCurrentData;
        // console.log('current', current);
        var tableRowTemplate = '';
        // console.log('data',current);
        tableRowTemplate += '<tr class="table-css-header-blue js-table-css-header-blue">\n' +
            '                                                <td>\n' +
            '                                                    <a href="javascript:void(0)" class="back-button-fix js-conference-user-search ' + ( (current.parent_area_id == -1) ? ('hide') : ('') ) + '" data-area-id="' + ( (current.parent_area_id == null ) ? ('0') : (current.parent_area_id) ) + '">\n' +
            '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n' +
            '                                                            <metadata><!--?xpacket begin="&#65279;" id="W5M0MpCehiHzreSzNTczkc9d"?-->\n' +
            '                                                                <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        ">\n' +
            '                                                                    <rdf:rdf xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n' +
            '                                                                        <rdf:description rdf:about=""></rdf:description>\n' +
            '                                                                    </rdf:rdf>\n' +
            '                                                                </x:xmpmeta>\n' +
            '                                                                <!--?xpacket end="w"?--></metadata>\n' +
            '                                                            <defs>\n' +
            '                                                            </defs>\n' +
            '                                                            <path id="back" class="cls-1" d="M16,32A16,16,0,1,1,32,16,16.018,16.018,0,0,1,16,32ZM16,2A14,14,0,1,0,30,16,14.016,14.016,0,0,0,16,2Zm7,15H11.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.415l4-4a1,1,0,0,1,1.414,1.414L11.414,15H23A1,1,0,0,1,23,17Z"></path>\n' +
            '                                                        </svg>\n' +
            '                                                    </a>\n' +
            '                                                </td>\n' +
            '                                                <td>' + current.employee_name + '</td>\n' +
            '                                                <td>' + current.product__line_name + '</td>\n' +
            '                                                <td>' + current.area_name + '</td>\n' +
            '                                                <td>\n' +
            '                                                    <div class="form-group">\n' +
            '                                                        <input disabled type="number" class="form-control js-input-fee-current" value="' + current.amount_fee + '" placeholder="Ilość">\n' +
            '                                                    </div>\n' +
            '                                                </td>\n' +
            '                                                <td>\n' +
            '                                                    <div class="form-group">\n' +
            '                                                        <input disabled type="number" class="form-control js-input-accommodation-current" value="' + current.amount_accommodation + '" placeholder="Ilość">\n' +
            '                                                    </div>\n' +
            '                                                </td>\n' +
            '                                            </tr>';
        tableRowTemplate += '<tr class="table-css-header-blue">\n' +
            '<td colspan="6">';
        var showFlex = false;
        if (current.area_id !== null) {
          showFlex = true
        }
        tableRowTemplate += '<div class="d-flex flex-start flex-align-start ' + ((showFlex) ? '' : 'hide') + '">' +
            '<div class="css-grid-1-3 padding-2-2 bg-white">' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Ilość FEE</span><span class="js-current-fee-ammount">' + current.amount_fee + '</span></p>' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Ilość noclegów</span><span class="js-current-accommodation-ammount">' + current.amount_accommodation + '</span></p>' +
            '</div>' +
            '<div class="css-grid-1-3 padding-2-2 bg-white">' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Przydzielonych FEE</span><span class="js-current-fee-allocation">' + current.allocation_fee + '</span></p>' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Przydzielonych noclegów</span><span class="js-current-accommodation-allocation">' + current.allocation_accommodation + '</span></p>' +
            '</div>' +
            '<div class="css-grid-1-3 padding-2-2 bg-white">' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Nieprzydzielonych FEE</span><span class="js-current-fee-free">' + current.free_fee + '</span></p>' +
            '<p class="d-flex flex-align-center color-text-def"><span class="w-85">Nieprzydzielonych noclegów</span><span class="js-current-accommodation-free">' + current.free_accommodation + '</span></p>' +
            '<p class="text-right"><button class="btn btn-primary js-divide-accommodation-equal-table">Podziel po równo</button></p>'
        '</div>' +
        '</div>';
      
        tableRowTemplate += '</td>' +
            '</tr>';
      
        return tableRowTemplate;
      };
      /** build table rows children*/
      var generateTableRowsChildren = function (departmentId, conferenceId, rowChildrenData,elContainer) {
        var tableRows = rowChildrenData;
        var tableRowTemplate = '';
        // console.log('search');
        // console.log(tableRows);
        tableRows.forEach(function (el, index) {
          var userNameTd = '';
          var searchPerson = false;
          var searchPersonId = elContainer[0].getAttribute('data-search-user-area-id');
          // console.log(elContainer[0].getAttribute('data-search-user-area-id'));
          // console.log('searchPersonId',searchPersonId,'     current',el.area_id);
          // console.log('current',el);
          if(el.area_id == searchPersonId){
            // console.log('znaleziono',searchPersonId);
            searchPerson = true;
          }
          if (el.last_child) {
            userNameTd = '<td>' + el.employee_name + '</td>\n'
          }
          else {
            userNameTd = '<td><a href="javascript:void(0)" class="js-conference-user-search" data-area-id="' + el.area_id + '">' + el.employee_name + '</a></td>\n'
          }
          tableRowTemplate += '<tr class="' + ( (searchPerson) ? ('search-person') : (' ') ) + '">' +
              '     <td>\n' +
              '     </td>\n' +
              userNameTd +
              '     <td>' + el.product__line_name + '</td>\n' +
              '     <td>' + el.area_name + '</td>\n' +
              '     <td>\n' +
              '         <div class="form-group">\n' +
              '             <input type="number" name="allocations[' + departmentId + '][' + index + '][area_id]" class="form-control hide" value="' + el.area_id + '">\n' +
              '             <input type="number" name="allocations[' + departmentId + '][' + index + '][fee]" class="form-control js-input-fee" value="' + el.amount_fee + '" placeholder="Ilość">\n' +
              '         </div>\n' +
              '     </td>\n' +
              '     <td>\n' +
              '         <div class="form-group">\n' +
              '             <input type="number" name="allocations[' + departmentId + '][' + index + '][accommodation]" class="form-control js-input-accommodation" value="' + el.amount_accommodation + '" placeholder="Ilość">\n' +
              '         </div>\n' +
              '     </td>\n' +
              ' </tr>';
        });
        return tableRowTemplate;
      };
    
      /** generowanie 3 boxy krok 3 top */
      var generateBoxGlobalCount = function (data) {
        // console.log(data);
        $('.js-fee-count').html(data.amount_fee);
        $('.js-accommodation-count').html(data.amount_accommodation);
      
        $('.js-fee-assign').html(data.allocation_fee);
        $('.js-accommodation-assign').html(data.allocation_accommodation);
      
        $('.js-fee-noassign').html(data.free_fee);
        $('.js-accommodation-noassign').html(data.free_accommodation);
      };
      /** generowanie tabelki z przeszukiwaniem i przegladaniem uzytkownikow krok 3*/
      var generateTableSelectUsers = function (elContainer) {
        var loading = new LoadingContent($('.js-container-load'));
        loading.loadingEnabled();
      
        var containers = $(elContainer);
        // console.log('containers',containers);
        // var loading = new LoadingContent($('.js-breadcrumb-user-search-spinner'));
        // loading.loadingEnabled();
        $.each(containers, function (index, elContainer) {
        
          // console.log(elContainer);
          var departmentId = $(elContainer).data('departmentId');
        
          // console.log(elContainer);
        
          var conferenceId = $(elContainer).data('conferenceId');
          var url = '/api/allocation/getListByArea?conference_id=' + conferenceId + '&department_id=' + departmentId;
          axios.get(url)
          .then(function (response) {
            redirectOnError(response);
            // console.log(response);
            // console.log(elContainer,conferenceId,departmentId,null,response.data.data.breadcrumb);
            generateBoxGlobalCount(response.data.data.global);
            var rowsTable = '';
            buildBdredcrumbs(elContainer, conferenceId, departmentId, null, response.data.data.breadcrumb);
            rowsTable = generateTableRowsCurrent(conferenceId, departmentId, response.data.data.current);
            rowsTable += generateTableRowsChildren(departmentId, conferenceId, response.data.data.children,$(elContainer));
            $(elContainer).find('.js-conference-user-search-table').find('tbody').html(rowsTable);
            // isShowDiveideButtonTable(  $(elContainer) );
            loading.loadingDisabled();
          })
          .catch(function (error) {
            console.log(error);
          });
        });
      };
    
      /** pobranie danych z wszystkich elementow forma krok3*/
      var getDataFormAllocation = function () {
        var data = $('form').serialize();
        return data;
      };
    
    
      /** wykrycie klikniecia na zmiana w tabelce konferencji 3 krok*/
      $('body').on('click', '.js-conference-user-search', function () {
        var elContainer = $(this).closest('.js-department-container');
        if( $(this).hasClass('js-add-search-person-area-id') ){
          var userAreaId = parseInt( $(this).data('searchUserAreaId') );
          elContainer.attr('data-search-user-area-id',userAreaId);
        };
      
        var loading = new LoadingContent($('.js-container-load'));
        loading.loadingEnabled();
        var conferenceId = elContainer.data('conferenceId');
        var departmentId = elContainer.data('departmentId');
        var areaId = $(this).data('areaId');
        // console.log(areaId);
        var url = '/api/allocation/getListByArea?conference_id=' + conferenceId + '&department_id=' + departmentId;
        if (areaId) {
          url += '&area_id=' + areaId;
        }
      
      
        var dataForm = 'conference_id=' + conferenceId + '&';
        var areaIdCurrent = parseInt(elContainer.find('.js-conference-user-search').data('areaId'));
        if (areaIdCurrent) {
          dataForm += 'area_id=' + areaIdCurrent + '&';
        }
        dataForm += getDataFormAllocation();
        // console.log(dataForm);
        axios.post('/api/allocation', dataForm)
        .then(function (response) {
          var redirectURL = true;
          if (response.data.status == "validation") {
            var notyfi = new Notify();
            notyfi.showNotyfication(response.data.data[0], 'error');
            loading.loadingDisabled();
            redirectURL = false;
            action = '';
            return false;
          }
          if(redirectURL==true && action.length>0){
            if (action == 'next') {
              $('input.btn-next').trigger('click');
            }
          
            if (action == 'back') {
              $('input.btn-back').trigger('click');
            }
          
            if (action == 'save') {
              $('input.js-btn-save').trigger('click');
            }
          }
          axios.get(url)
          .then(function (response) {
            redirectOnError(response);
            // console.log('z get->', response);
            var rowsTable = '';
            generateBoxGlobalCount(response.data.data.global);
            buildBdredcrumbs(elContainer, conferenceId, departmentId, areaId, response.data.data.breadcrumb);
            rowsTable = generateTableRowsCurrent(conferenceId, departmentId, response.data.data.current);
            rowsTable += generateTableRowsChildren(departmentId, conferenceId, response.data.data.children,elContainer);
            $(elContainer).find('.js-conference-user-search-table').find('tbody').html(rowsTable);
            loading.loadingDisabled();
          
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      });
    
    
      /** wykrycie klika i przeliczanie miejsc krok FEE 3*/
      $('body').on('keyup', '.js-input-fee', function () {
        var inputs$ = $('body').find('input.js-input-fee');
        var feenotAssign$ = $('.js-fee-noassign');
        var totalFee = parseInt($('.js-fee-count').html());
        var totalFeeAssigned = 0;
      
        var currentTable$ = $(this).closest('.js-conference-user-search-table');
      
        var inputsTable$ = currentTable$.find('input.js-input-fee');
        var feeTableAmmount$ = currentTable$.find('.js-current-fee-ammount');
        var feeTableAssign$ = currentTable$.find('.js-current-fee-allocation');
        var feeTableFree$ = currentTable$.find('.js-current-fee-free');
        var totalTableFeeAssigned = 0;
        var totalTableFee = parseInt(feeTableAmmount$.html());
      
        $.each(inputsTable$, function (index, input) {
          if (input.value) {
            totalTableFeeAssigned += parseInt(input.value);
          }
        });
        feeTableAssign$.html(totalTableFeeAssigned);
        feeTableFree$.html(totalTableFee - totalTableFeeAssigned);
        if (totalTableFee - totalTableFeeAssigned < 0) {
          feeTableFree$.addClass('error');
        }
        else {
          feeTableFree$.removeClass('error');
        }
      
        $.each(inputs$, function (index, input) {
          if (input.value) {
            totalFeeAssigned += parseInt(input.value);
          }
        });
      
        feenotAssign$.html(totalFee - totalFeeAssigned);
        $('.js-fee-assign').html(totalFeeAssigned);
        if (totalFee - totalFeeAssigned < 0) {
          feenotAssign$.addClass('error');
        }
        else {
          feenotAssign$.removeClass('error');
        }
        if($(this).val().length<1){
          $(this).val(0)
        }
      });
    
      /** wykrycie klika i przeliczanie miejsc krok accomodation 3*/
      $('body').on('keyup', '.js-input-accommodation', function () {
        var inputs$ = $('body').find('input.js-input-accommodation');
        var accommodationnotAssign$ = $('.js-accommodation-noassign');
        var totalAccommodation = parseInt($('.js-accommodation-count').html());
        var totalAccommodationAssigned = 0;
      
      
        var currentTable$ = $(this).closest('.js-conference-user-search-table');
        var inputsTable$ = currentTable$.find('input.js-input-accommodation');
        var accommodationTableAmmount$ = currentTable$.find('.js-current-accommodation-ammount');
        var accommodationTableAssign$ = currentTable$.find('.js-current-accommodation-allocation');
        var accommodationTableFree$ = currentTable$.find('.js-current-accommodation-free');
        var totalTableAccommodationAssigned = 0;
        var totalTableAccommodation = parseInt(accommodationTableAmmount$.html());
      
        $.each(inputsTable$, function (index, input) {
          if (input.value) {
            totalTableAccommodationAssigned += parseInt(input.value);
          }
        });
        console.log(totalTableAccommodation, totalTableAccommodationAssigned);
        accommodationTableAssign$.html(totalTableAccommodationAssigned);
        accommodationTableFree$.html(totalTableAccommodation - totalTableAccommodationAssigned);
        if (totalTableAccommodation - totalTableAccommodationAssigned < 0) {
          accommodationTableFree$.addClass('error');
        }
        else {
          accommodationTableFree$.removeClass('error');
        }
      
      
        $.each(inputs$, function (index, input) {
          if (input.value) {
            totalAccommodationAssigned += parseInt(input.value);
          }
        });
        $('.js-accommodation-assign').html(totalAccommodationAssigned);
        if (totalAccommodation - totalAccommodationAssigned < 0) {
          accommodationnotAssign$.addClass('error');
        }
        else {
          accommodationnotAssign$.removeClass('error');
        }
        if($(this).val().length<1){
          $(this).val(0)
        }
      });
    
      /** podzial miejsc na starcie po rowno krok 3*/
      $('body').on('click', '.js-divide-accommodation-equal', function (e) {
        // console.log('przydzial miejsc auto');
        var elContainers = $('.js-department-container');
      
        var feeNotAssign = parseInt($('.js-fee-noassign').html());
        var inputsFee = elContainers.find('.js-input-fee');
        var restFee = feeNotAssign % inputsFee.length;
      
        var accommodationNotAssign = parseInt($('.js-accommodation-noassign').html());
        var inputsAccommodation = elContainers.find('.js-input-accommodation');
        var restAccommodation = accommodationNotAssign % inputsAccommodation.length;
      
      
        var canDivideGlobal = true;
      
        // console.log(inputsFee,inputsAccommodation);
      
        $.each(inputsFee, function (index, input) {
          // console.log(input.value.length);
          if (input.value.length > 0) {
            canDivideGlobal = false;
            return false;
          }
        });
      
        $.each(inputsAccommodation, function (index, input) {
          // console.log(input.value.length);
          if (input.value.length > 0) {
            canDivideGlobal = false;
            return false;
          }
        });
        // console.log(canDivideGlobal);
        if (!canDivideGlobal) {
          var notyfy = new Notify();
          notyfy.showNotyfication('Miejsca zostały już przydzielone, nie możesz skorzystać ponownie z funkcji PODZIEL PO RÓWNO','warn');
          $(this).prop('disabled', true);
          e.preventDefault();
          return false;
        }
      
        /** przelicznie FEE */
      
        if (restFee != 0) {
          $('.js-fee-noassign').html(restFee);
        }
        else {
          $('.js-fee-noassign').html(0);
        }
        $('.js-fee-assign').html(feeNotAssign - restFee);
        $.each(inputsFee, function (index, input) {
          input.value = parseInt(feeNotAssign - restFee) / inputsFee.length;
        });
      
        /** przelicznie accommodation */
      
        if (restAccommodation != 0) {
          $('.js-accommodation-noassign').html(restAccommodation);
        }
        else {
          $('.js-accommodation-noassign').html(0);
        }
        $('.js-accommodation-assign').html(accommodationNotAssign - restAccommodation);
        $.each(inputsAccommodation, function (index, input) {
          input.value = parseInt(accommodationNotAssign - restAccommodation) / inputsAccommodation.length;
        });
      
        $(this).prop('disabled', true);
        e.preventDefault();
        return false;
      });
    
    
      /** podzial miejsc po rowno w tabelka*/
      $('body').on('click', '.js-divide-accommodation-equal-table', function (e) {
        // console.log('click');
        var elContainerTable$ = $(this).closest('.js-conference-user-search-table');
        var inputsFee$ = elContainerTable$.find('.js-input-fee');
        var feeNotAssign = parseInt(elContainerTable$.find('.js-current-fee-free').html());
        var restFee = feeNotAssign % inputsFee$.length;
        var inputsAccommodation$ = elContainerTable$.find('.js-input-accommodation');
        var accommodationNotAssign = parseInt(elContainerTable$.find('.js-current-accommodation-free').html());
        var restAccommodation = accommodationNotAssign % inputsAccommodation$.length;
        var candDivideTable = true;
        var currentRowInputFee$ = elContainerTable$.find('.js-input-fee-current');
        var currentRowInputAccommodation$ = elContainerTable$.find('.js-input-accommodation-current');
        // console.log('dane',currentRowInputFee$,currentRowInputAccommodation$);
        if( currentRowInputFee$.val() == 0 && currentRowInputAccommodation$.val() == 0){
          console.log('tutaj');
          var notyfy = new Notify();
          notyfy.showNotyfication('Nadrzędny poziom nie ma przydzielonych miejsc','warn');
          $(this).prop('disabled', true);
          return false;
        }
      
        $.each(inputsFee$, function (index, input) {
          console.log(input.value.length);
          if (input.value.length > 0) {
            candDivideTable = false;
            return false;
          }
        });
      
        $.each(inputsAccommodation$, function (index, input) {
          if (input.value.length > 0) {
            candDivideTable = false;
            return false;
          }
        });
      
        if(inputsFee$.length>feeNotAssign || inputsAccommodation$.length>accommodationNotAssign){
          var notyfi = new Notify();
          notyfi.showNotyfication('Nie można podzielić miejsc. Zbyt mała ilość FEE lub noclegów.', 'error');
          $(this).prop('disabled', true);
          return false
        }
        if (!candDivideTable) {
          var notyfi = new Notify();
          notyfi.showNotyfication('Nie można podzielić miejsc, ponieważ ilość fee lub noclegów jest zbyt mała.', 'error');
          $(this).prop('disabled', true);
          return false;
        }
      
        $.each(inputsFee$, function (index, input) {
          input.value = parseInt(feeNotAssign - restFee) / inputsFee$.length;
        });
      
        if (restFee != 0) {
          elContainerTable$.find('.js-current-fee-free').html(restFee);
        }
        else {
          elContainerTable$.find('.js-current-fee-free').html(0);
        }
        elContainerTable$.find('.js-current-fee-allocation').html(feeNotAssign - restFee);
      
      
        $.each(inputsAccommodation$, function (index, input) {
          input.value = parseInt(accommodationNotAssign - restAccommodation) / inputsAccommodation$.length;
        });
        if (restAccommodation != 0) {
          elContainerTable$.find('.js-current-accommodation-free').html(restAccommodation);
        }
        else {
          elContainerTable$.find('.js-current-accommodation-free').html(0);
        }
        elContainerTable$.find('.js-current-accommodation-allocation').html(accommodationNotAssign - restAccommodation);
        $(this).prop('disabled', true);
        e.preventDefault();
        return false;
      });
    
      /** czy wybrane inputy sa puste*/
      var checkInputsInTable = function (Inputs) {
        var isInputsEmpty = true;
        $.each(Inputs, function (index, input) {
          if (input.value.length > 1) {
            isInputsEmpty = false;
            return false;
          }
        });
        return isInputsEmpty;
      };
    
    
      var buildTableCostsFeePacage = function () {
        var feeAmmount = 0;
        var pacageConfAmmount = 0;
        var other = 0;
        var packageCostIncludedAmount = 0;
        var transport = 0;
        var accommodationContractCost = 0;
        var templateFee = '';
        var templateOther = '';
        var templatepacageConfAmmount = '';
        var templateAccommodationContractCost = '';
        var templatepackageCostIncludedAmount = '';
        var templateTransport = '';
        var budgetSum = false;
        if ($('.js-add-fee').prop('checked')) {
          budgetSum = true;
          // console.log( $('.js-fee-cost-account')[0].value,$('.js-fee-cost-account')[0].value.replace(/(\D^,)/g,'') );
          var value = _.toNumber(_.replace( $('.js-fee-cost-account')[0].value,',','.' ));
          // console.log(value);
          if (!value) {
            value = 0;
          }
          feeAmmount = value;
        
          templateFee = '<tr>\n' +
              '               <td>FEE</td>\n' +
              '               <td class="text-right" style="width: 200px;">' + feeAmmount + ' zł</td>\n' +
              '<td></td>'+
              '           </tr>\n';
        }
      
        if ($('.js-other-contract-included').prop('checked')) {
          budgetSum = true;
          var value = _.toNumber(_.replace( $('.js-other-cost')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          other = value;
          templateOther = ' <tr>\n' +
              '<td>' + $(".js-other-text-name").html() + '</td>' +
              '<td class="text-right" style="width: 200px;">' + other + ' zł</td>\n' +
              '<td></td>'+
              '</tr>\n'
        
        }
        if ($('.js-package-conf').prop('checked')) {
          budgetSum = true;
          var value = _.toNumber(_.replace( $('.js-package-cost-included-amount')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          packageCostIncludedAmount = value;
          templatepackageCostIncludedAmount = ' <tr>\n' +
              '<td>Pakiet konferencyjny</td>\n' +
              '<td class="text-right" style="width: 200px;">' + packageCostIncludedAmount + ' zł</td>\n' +
              '<td></td>'+
              '</tr>\n'
        
        }
        if ($('.js-transport-contract-included').prop('checked')) {
          budgetSum = true;
          var value = _.toNumber(_.replace( $('.js-transport-cost')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          transport = value;
          templateTransport = ' <tr>\n' +
              '<td>Transport</td>\n' +
              '<td class="text-right" style="width: 200px;">' + transport + ' zł</td>\n' +
              '<td></td>'+
              '</tr>\n'
        
        }
        if ($('.js-accommodation-contract-included').prop('checked')) {
          budgetSum = true;
          var value = _.toNumber(_.replace( $('.js-accommodation-contract-cost')[0].value,',','.' ));
          // console.log(value);
          if (!value) {
            value = 0;
          }
          accommodationContractCost = value;
          templateAccommodationContractCost = ' <tr>\n' +
              '<td>Nocleg</td>\n' +
              '<td class="text-right" style="width: 200px;">' + accommodationContractCost + ' zł</td>\n' +
              '<td></td>'+
              '</tr>\n'
        
        }
        var total = _.round(feeAmmount + other + packageCostIncludedAmount + transport + accommodationContractCost,2);
        var tableTemplate = '<table class="table table-css">\n' +
            '                                        <thead>\n' +
            '                                        <tr>\n' +
            '                                            <th style="width: 100px"><label>Nazwa</label></th>\n' +
            '                                            <th class="text-right" style="width: 200px;"><label>Kwota</label></th>\n' +
            '<th></th>'+
            '                                        </tr>\n' +
            '                                        </thead>\n' +
            '                                        <tbody>\n' +
            templateFee +
            templateAccommodationContractCost +
            templateTransport +
            templatepackageCostIncludedAmount +
            templateOther +
            '                                        </tbody>\n' +
            '                                        <tfoot>\n' +
            '                                        <tr>\n' +
            '                                            <td style="width: 100px;"><label>RAZEM</label></td>\n' +
            '                                            <td class="text-right" style="width: 200px;"><label>' + total + ' zł</label></td>\n' +
            '<td></td>'+
            '                                        </tr>\n' +
            '                                        </tfoot>\n' +
            '                                    </table>';
      
        $('.js-table-costs').html(tableTemplate);
        $('.js-budget-sum').attr("placeholder", "Wprowadź kwotę umowy");
        if($('.js-budget-sum').attr('data-form-dirty')!=0 && $('.js-budget-sum').length>0){
          var oldTotal = $('.js-budget-sum').val();
          showWarning();
          if(_.toNumber(total)>_.toNumber(_.replace( oldTotal,',','.' ))){
            $('.js-budget-sum').val(_.replace( total,'.',',' ));
          }
        }
      };
      var showWarning = _.debounce(function(){
        notyfi.showNotyfication('Zmieniłeś koszty sprawdź kwotę umowy.', 'warning');
        // $('.js-budget-sum').focus();
      }, 1000);
    
      var resetStatusBudgetSum = function (this$) {
        //jezeli ma nie pokazywac komunikat jak checkbox jest niezaznaczony
        // if(this$.closest('.js-group-cost').find('input:checkbox').prop('checked')){
        // }
        $('.js-budget-sum').attr('data-form-dirty',1);
      };
      /** aktualizacja table fee i  pakiet konferencyjny*/
      $('.js-package-conf').on('click', function () {
        resetStatusBudgetSum($(this));
        buildTableCostsFeePacage();
        updateSummaryTable();
      });
      $('.js-package-cost-included-amount').on('keyup', function () {
        resetStatusBudgetSum($(this));
        buildTableCostsFeePacage();
        updateSummaryTable();
      });
      $('.js-package-cost-included-amount').on('keyup', function () {
        resetStatusBudgetSum($(this));
        buildTableCostsFeePacage();
        updateSummaryTable();
      });
    
      $('.js-fee-cost-account').on('keyup', function () {
        resetStatusBudgetSum($(this));
        buildTableCostsFeePacage();
        updateSummaryTable();
      });
      $('.js-add-fee').on('click', function () {
        resetStatusBudgetSum($(this));
        buildTableCostsFeePacage();
        updateSummaryTable();
      
      });
    
      $('.js-accommodation-contract-included').on('click', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
      $('.js-accommodation-contract-cost').on('keyup', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
      $('.js-transport-contract-included').on('click', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
      $('.js-transport-cost').on('keyup', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
    
      $('.js-other-contract-included').on('click', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
      $('.js-other-cost').on('keyup', function () {
        resetStatusBudgetSum($(this));
        updateSummaryTable();
        buildTableCostsFeePacage();
      });
    
    
      /** aktualizacja table koszt udziału uczestnika */
      var updateSummaryTable = function () {
        var total = 0;
        var feeAmmount = 0;
        var pacageConfAmmount = 0;
        var transportAmmount = 0;
        var packageCostAmount = 0;
        var otherCostIncludedAmount = 0;
      
        if ($('.js-fee-cost-account').length>0) {
          var value = _.toNumber(_.replace( $('.js-fee-cost-account')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          feeAmmount = value;
        }
      
        if($('.js-accommodation-contract-cost').length>0){
          var value = _.toNumber(_.replace( $('.js-accommodation-contract-cost')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          pacageConfAmmount = value;
        }
      
        if($('.js-transport-cost').length>0){
          var value = _.toNumber(_.replace( $('.js-transport-cost')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          transportAmmount = value;
        }
      
        if($('.js-package-cost-included-amount').length>0){
          var value = _.toNumber(_.replace( $('.js-package-cost-included-amount')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          packageCostAmount = value;
        }
      
        if($('.js-other-cost').length>0){
          var value = _.toNumber(_.replace( $('.js-other-cost')[0].value,',','.' ));
          if (!value) {
            value = 0;
          }
          otherCostIncludedAmount = value;
        }
      
        $('.js-fee-summary-amount').html(feeAmmount);
        $('.js-accommodation-summary-amount').html(pacageConfAmmount);
        $('.js-transport-summary-amount').html(transportAmmount);
        $('.js-package-summary-amount').html(packageCostAmount);
        $('.js-other-summary-amount').html(otherCostIncludedAmount);
      
        total = _.round(feeAmmount + pacageConfAmmount + transportAmmount + packageCostAmount + otherCostIncludedAmount,2);
        $('.js-total-summary-amount').html(total);
      };
    
    
      /** krok 1 departament zmiana makroregion*/
          // var markMakroregion = function (el) {
          //     // console.log('TO DO');
          // };
          // $('.js-makro-switch-base-department').on('click', function () {
          //     markMakroregion($(this));
          // });
    
      var checkSelectApplication = function(){
            var isSelected = $('.js-show-hide-target:checked');
            if(isSelected.length>0){
              $('.js-notyfication-from').css('display','flex');
              $('.js-deals-from').css('display','flex');
              $('.js-participation').css('display','block');
            }
            else{
              $('.js-notyfication-from').css('display','none');
              $('.js-deals-from').css('display','none');
              $('.js-participation').css('display','none');
            }
          };
    
      /** init skrypt*/
      generateTableSelectUsers('.js-department-container');
      updateSummaryTable();
      buildTableCostsFeePacage();
      updateStatusAccommodationCount();
      checkSelectApplication();
    });
  }
}