// Additional testing matchers for Jasmine
// https://github.com/angular/angular.js/blob/master/test/helpers/matchers.js

'use strict';

beforeEach(function() {

    function cssMatcher(presentClasses, absentClasses) {
        return function(util, customEqualityTesters) {
            return {
                compare: function(actual) {
                    var element = angular.element(actual);
                    var present = true;
                    var absent = false;

                    angular.forEach(presentClasses.split(' '), function(className) {
                        present = present && element.hasClass(className);
                    });

                    angular.forEach(absentClasses.split(' '), function(className) {
                        absent = absent || element.hasClass(className);
                    });

                    return {
                        pass: present && !absent,
                        message: 'Expected to have class(es) [' + presentClasses + ']'
                            + (absentClasses ? (' and not have [' + absentClasses + ']') : '')
                            + ' but had [' + element.prop('class') + '].'
                    };
                }
            };
        };
    }

    function isVisible(util, customEqualityTesters) {
        return {
            compare: function(actual) {
                //// we need to check element.getAttribute for SVG nodes
                //var hidden = true;
                //angular.forEach(angular.element(actual), function(element) {
                //    if ((' ' + (element.getAttribute('class') || '') + ' ').indexOf(' ng-hide ') === -1) {
                //        hidden = false;
                //    }
                //});
                //return hidden;

                var element = angular.element(actual);

                var returnValue = {};
                returnValue.pass = !(element.hasClass('ng-hide') || element.parents('.ng-hide').length);
                returnValue.message = 'Expected ' + actual.selector + (returnValue.pass ? ' not' : '') + ' to be visible.';

                return returnValue;
            }
        };
    }

    function isHidden(util, customEqualityTesters) {
        return {
            compare: function(actual) {
                //// we need to check element.getAttribute for SVG nodes
                //var hidden = true;
                //angular.forEach(angular.element(actual), function(element) {
                //    if ((' ' + (element.getAttribute('class') || '') + ' ').indexOf(' ng-hide ') === -1) {
                //        hidden = false;
                //    }
                //});
                //return hidden;

                var element = angular.element(actual);

                var returnValue = {};
                returnValue.pass = element.hasClass('ng-hide') || !!element.parents('.ng-hide').length;
                returnValue.message = 'Expected ' + actual.selector + (returnValue.pass ? '' : ' not') + ' to be visible.';

                return returnValue;
            }
        };
    }

    function hasProperty(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var returnValue = {};
                returnValue.pass = actual.hasOwnProperty(expected);
                returnValue.message = 'Expected ' + actual + '["' + expected + '"]' + (returnValue.pass ? ' not' : '') + ' to exist.';

                return returnValue;
            }
        };
    }

    function matchError(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                var err,
                    returnValue = {
                        pass: false,
                        message: 'Expected ' + actual + 'to throw an Error.'
                    };

                try {
                    actual();
                } catch (e) {
                    //if (e.message && e.name == 'Error') {
                    //    err = angular.toJson(e.message);
                    //} else {
                    //    err = angular.toJson(e);
                    //}
                    err = e.toString();
                }

                //returnValue.pass = false;
                //returnValue.message = 'Expected ' + actual + 'to throw an Error.';

                if (err) {
                    returnValue.pass = expected.test(err);
                    returnValue.message = 'Expected ' + err + (returnValue.pass ? ' not' : '') + ' to match an Error with message ' + expected.toString() + '.';
                }

                return returnValue;
            }
        };
    }

    function indexOf(array, obj) {
        for (var i = 0; i < array.length; i++) {
            if (obj === array[i]) return i;
        }
        return -1;
    }

    /**
     * Matchers still to be fixed - these are using the Jasmine 1.x api
     */
    function _haveBeenCalledOnce() {
        //    if (arguments.length > 0) {
        //        throw new Error('toHaveBeenCalledOnce does not take arguments, use toHaveBeenCalledWith');
        //    }

        //    if (!jasmine.isSpy(this.actual)) {
        //        throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
        //    }

        //    this.message = function () {
        //        var msg = 'Expected spy ' + this.actual.identity + ' to have been called once, but was ',
        //            count = this.actual.callCount;
        //        return [
        //          count === 0 ? msg + 'never called.' :
        //                        msg + 'called ' + count + ' times.',
        //          msg.replace('to have', 'not to have') + 'called once.'
        //        ];
        //    };

        //    return this.actual.callCount == 1;
    }

    function _haveBeenCalledOnceWith() {
        //    var expectedArgs = jasmine.util.argsToArray(arguments);

        //    if (!jasmine.isSpy(this.actual)) {
        //        throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
        //    }

        //    this.message = function () {
        //        if (this.actual.callCount != 1) {
        //            if (this.actual.callCount === 0) {
        //                return [
        //                  'Expected spy ' + this.actual.identity + ' to have been called once with ' +
        //                    jasmine.pp(expectedArgs) + ' but it was never called.',
        //                  'Expected spy ' + this.actual.identity + ' not to have been called with ' +
        //                    jasmine.pp(expectedArgs) + ' but it was.'
        //                ];
        //            }

        //            return [
        //              'Expected spy ' + this.actual.identity + ' to have been called once with ' +
        //                jasmine.pp(expectedArgs) + ' but it was called ' + this.actual.callCount + ' times.',
        //              'Expected spy ' + this.actual.identity + ' not to have been called once with ' +
        //                jasmine.pp(expectedArgs) + ' but it was.'
        //            ];
        //        } else {
        //            return [
        //              'Expected spy ' + this.actual.identity + ' to have been called once with ' +
        //                jasmine.pp(expectedArgs) + ' but was called with ' + jasmine.pp(this.actual.argsForCall),
        //              'Expected spy ' + this.actual.identity + ' not to have been called once with ' +
        //                jasmine.pp(expectedArgs) + ' but was called with ' + jasmine.pp(this.actual.argsForCall)
        //            ];
        //        }
        //    };

        //    return this.actual.callCount === 1 && this.env.contains_(this.actual.argsForCall, expectedArgs);
    }

    function _beOneOf() {
        //    return indexOf(arguments, this.actual) !== -1;
    }

    function _haveClass(clazz) {
        //    this.message = function () {
        //        return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + clazz + "'.";
        //    };
        //    return this.actual.hasClass ?
        //            this.actual.hasClass(clazz) :
        //            angular.element(this.actual).hasClass(clazz);
    }

    function _throwMatching(expected) {
        //    return jasmine.Matchers.prototype.toThrow.call(this, expected);
    }

    function _throwMinErr(namespace, code, content) {
        //    var result,
        //      exception,
        //      exceptionMessage = '',
        //      escapeRegexp = function (str) {
        //          // This function escapes all special regex characters.
        //          // We use it to create matching regex from arbitrary strings.
        //          // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        //          return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        //      },
        //      codeRegex = new RegExp('^\\[' + escapeRegexp(namespace) + ':' + escapeRegexp(code) + '\\]'),
        //      not = this.isNot ? "not " : "",
        //      regex = jasmine.isA_("RegExp", content) ? content :
        //                angular.isDefined(content) ? new RegExp(escapeRegexp(content)) : undefined;

        //    if (!angular.isFunction(this.actual)) {
        //        throw new Error('Actual is not a function');
        //    }

        //    try {
        //        this.actual();
        //    } catch (e) {
        //        exception = e;
        //    }

        //    if (exception) {
        //        exceptionMessage = exception.message || exception;
        //    }

        //    this.message = function () {
        //        return "Expected function " + not + "to throw " +
        //          namespace + "MinErr('" + code + "')" +
        //          (regex ? " matching " + regex.toString() : "") +
        //          (exception ? ", but it threw " + exceptionMessage : ".");
        //    };

        //    result = codeRegex.test(exceptionMessage);
        //    if (!result) {
        //        return result;
        //    }

        //    if (angular.isDefined(regex)) {
        //        return regex.test(exceptionMessage);
        //    }
        //    return result;
    }

    // -------

    var matchers = {
        toBeValid: cssMatcher('ng-valid', 'ng-invalid'),
        toBeInvalid: cssMatcher('ng-invalid', 'ng-valid'),
        toBePristine: cssMatcher('ng-pristine', 'ng-dirty'),
        toBeDirty: cssMatcher('ng-dirty', 'ng-pristine'),
        //toBeTouched: cssMatcher('ng-touched', 'ng-untouched'),
        //toBeUntouched: cssMatcher('ng-untouched', 'ng-touched'),
        toBeShown: isVisible,
        toBeHidden: isHidden,
        toHaveProperty: hasProperty,
        toMatchError: matchError,
    };

    jasmine.addMatchers(matchers);
});

(function() {

    //// TODO(bPratik): uncomment this if jasmine in karma is not up-to-date 
    //// https://github.com/pivotal/jasmine/blob/c40b64a24c607596fa7488f2a0ddb98d063c872a/src/core/Matchers.js#L217-L246
    //// This toThrow supports RegExps.
    //jasmine.Matchers.prototype.toThrow = function(expected) {
    //    var result = false;
    //    var exception, exceptionMessage;
    //    if (typeof this.actual != 'function') {
    //        throw new Error('Actual is not a function');
    //    }
    //    try {
    //        this.actual();
    //    } catch (e) {
    //        exception = e;
    //    }

    //    if (exception) {
    //        exceptionMessage = exception.message || exception;
    //        result = (isUndefined(expected) || this.env.equals_(exceptionMessage, expected.message || expected) || (jasmine.isA_("RegExp", expected) && expected.test(exceptionMessage)));
    //    }

    //    var not = this.isNot ? "not " : "";
    //    var regexMatch = jasmine.isA_("RegExp", expected) ? " an exception matching" : "";

    //    this.message = function() {
    //        if (exception) {
    //            return ["Expected function " + not + "to throw" + regexMatch, expected ? expected.message || expected : "an exception", ", but it threw", exceptionMessage].join(' ');
    //        } else {
    //            return "Expected function to throw an exception.";
    //        }
    //    };

    //    return result;
    //};

})();

/**
 * Create jasmine.Spy on given method, but ignore calls without arguments
 * This is helpful when need to spy only setter methods and ignore getters
 */
function spyOnlyCallsWithArgs(obj, method) {
    var spy = spyOn(obj, method);
    obj[method] = function() {
        if (arguments.length) return spy.apply(this, arguments);
        return spy.originalValue.apply(this);
    };
    return spy;
}
