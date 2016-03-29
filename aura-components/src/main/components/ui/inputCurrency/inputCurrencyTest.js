/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
    /**
     * Test currency formatted correctly.
     */
    testCurrency: {
        attributes: {value: 1234 },
        test: function (component) {
            var value = component.getElement().value;
            $A.test.assertEquals(1234, component.get("v.value"), "Cmp value does not equal expected");
            $A.test.assertEquals("$1,234.00", value, "Element value does not equal expected");
        }
    },
    
    /**
     * Test that the format is set by default
     */
    testDefaultFormat : {
    	test : function(component) {
    		var expectedFormat = "¤#,##0.00";
    		var format = component.get('v.format');
    		$A.test.assertEquals(expectedFormat, format, "The actual format did not match the expected format");
    	} 	
    },

    /**
     * Test currency formatted correctly with custom format.
     */
    testCurrencyWithFormat: {
        attributes: {value: 1234, format: "$#,###.0000"},
        test: function (component) {
            var value = component.getElement().value;
            $A.test.assertEquals(1234, component.get("v.value"), "Cmp value does not equal expected");
            $A.test.assertEquals("$1,234.0000", value, "Element value does not equal expected");
        }
    },

    /**
     * Verify that when the value changes it is re-rendered with the non-formatted new value
     */
    testUpdateValue: {
        attributes: {value: 1234, format: "$#,###.0000"},
        test: [
            function (cmp) {
                var value = cmp.getElement().value;
                $A.test.assertEquals(1234, cmp.get("v.value"), "Cmp value does not equal expected");
                $A.test.assertEquals("$1,234.0000", value, "Element value does not equal expected");
            },
            function (cmp) {
                cmp.set("v.value", 5678);
                $A.test.assertEquals(5678, cmp.get("v.value"), "Cmp value does not equal expected");

                $A.test.addWaitFor("$5,678.0000", function () {
                    return cmp.helper.getInputElement(cmp).value;
                });
            }]
    },

    /**
     * Verify that when the format changes it is not re-rendered with the new format
     */
    testUpdateFormat: {
        attributes: {value: 1234, format: "$#,###.0000"},
        test: function (component) {
            var value = component.getElement().value;
            $A.test.assertEquals(1234, component.get("v.value"), "Cmp value does not equal expected");
            $A.test.assertEquals("$1,234.0000", value, "Element value does not equal expected");
            component.set("v.format", '£#,###.00');
            $A.rerender(component);
            value = component.getElement().value;
            $A.test.assertEquals(1234, component.get("v.value"), "Cmp value does not equal expected");
            $A.test.assertEquals("$1,234.0000", value, "Element value does not equal expected");
        }
    }
})// eslint-disable-line semi
