
// script.js
$(function () {
  function removeFieldError($input) { $input.removeClass('input-error'); var $err = $input.next('.error-text'); if ($err.length) $err.remove(); }
  function showFieldError($input, message) { removeFieldError($input); $input.addClass('input-error'); var $msg = $('<div class="error-text field-error-placeholder"></div>').text(message); $input.after($msg); }
  function removeInlineError($el) { $el.hide().text(''); }
  function showInlineError($el, message) { $el.text(message).show(); }
  function validateNotEmpty($input) { var val = $.trim($input.val() || ''); if (!val) { showFieldError($input, 'this filed must not be empty'); return false; } else { removeFieldError($input); return true; } }

  $('#username, #email, #password, #confirmPassword').on('blur input', function () { validateNotEmpty($(this)); });
  $('.topic').on('change', function () { if ($('.topic:checked').length > 0) removeInlineError($('#topicsInlineError')); });
  $('#gender').on('change', function () { var v = $(this).val(); if (v && v !== '--') removeInlineError($('#genderInlineError')); });

  $('#submitBtn').on('click', function (e) {
    e.preventDefault(); var ok = true;
    $('#username, #email, #password, #confirmPassword').each(function () { if (!validateNotEmpty($(this))) ok = false; });
    if ($('.topic:checked').length === 0) { showInlineError($('#topicsInlineError'), 'At least one topic must be selected'); ok = false; } else removeInlineError($('#topicsInlineError'));
    var genderVal = $('#gender').val(); if (!genderVal || genderVal === '--') { showInlineError($('#genderInlineError'), 'please choose your gender'); ok = false; } else removeInlineError($('#genderInlineError'));
    var pass = $.trim($('#password').val() || ''), conf = $.trim($('#confirmPassword').val() || ''); if (conf !== pass) { showFieldError($('#confirmPassword'), 'confirmed password mismatched the password'); ok = false; } else if (conf !== '') removeFieldError($('#confirmPassword'));
    if (ok) alert('Form validation passed — ready to submit!'); else { var $firstErrInput = $('.input-error').first(); if ($firstErrInput.length) $firstErrInput.focus(); else { if ($('#topicsInlineError').is(':visible')) $('#topic1').focus(); else if ($('#genderInlineError').is(':visible')) $('#gender').focus(); } }
  });

  $('#confirmPassword').on('input', function () { var pass = $.trim($('#password').val() || ''), conf = $.trim($(this).val() || ''); if (conf === pass) removeFieldError($(this)); });
});

