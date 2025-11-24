const path = require('path');
exports.testData =
    class testData {
        constructor() {

            this.URL = "https://admin-qa.rooftopmeasurements.com/login"
            //login
            this.email = 'admin@email.com'
            this.password = 'admin@email.com'
            //credits
            this.customerName = 'swati N'
            this.reportType = 'standard'
            this.promoCode = 'StandardCred80$'
            this.orderID = '17233'
            this.updateCredit = '17332'
            this.refundCreditId = '17289'


            // addCard
            this.card_number = '371449635398431'
            this.card_month = '07'
            this.card_year = '2027'
            this.card_name = 'American Express'
            this.cardDetails = '- 2026-09'

            this.updateCreditsValue = '9'
            this.packagePrice = '1620'
            this.quantity = '8'
            this.cardLast4 = '1111'


            //customer

            this.newCustomer_companyName = 'IBM'
            // this.newCustomer_firstName = 'Vedant'
            // this.newCustomer_lastName = 'n'
            // this.newCustomer_email = 'vedanti@yopmail.com'
            this.newCustomer_phone = '9856764567'
            this.newCustomer_address = '2660 Grant Street'
            this.newCustomer_city = 'Victoria'
            this.newCustomer_state = 'Florida'
            this.newCustomer_zip = '77901'
            this.newCustomer_password = 'Swati@97'
            this.confirmPassword = 'Swati@97'


            //add ccemail 
            this.ccEmail_Cust = 'soumasseweddou@yopmail.com'
            this.ccEmail = 'swatinagula7@gmail.com'

            //delete ccemail
            this.deleteCC_Cust = 'veer@yopmail.com'
            this.deleteCCmail = 'swatinagula7@gmail.com'

            //update customer
            this.update_Cust = 'swatinagula7@gmail.com'
            this.updatePhone = '9867654334'

            //deactivate customer
            this.deactivateCustomer = 'taucayoissuco-8993@yopmail.com'

            //update CCEmail
            this.updateCCCust = 'swati1234@yopmail.com'
            this.oldCCEmail = 'swatinagula7@gmail.com'
            this.updatedCCEmail = 'swati444nagula@gmail.com'

            this.ccEmailCust = 'nikhil@yopmail.com'
            this.deleteCCEmailCust = 'veer@yopmail.com'
            this.updateCCEmailCust = 'swatinagula7@gmail.com'
            this.updateCust = 'swatinagula7@gmail.com'

            this.activateCustomer = 'veffeuprissoiquoi-1729@yopmail.com'
            this.addCardCustomer = 'nikhil@yopmail.com'
            this.deleteCustomer = 'OQndzByRS@yopmail.com'

            //employee
            this.newEmployee_name = 'march'
            this.newEmployee_email = 'ani@yopmail.com'
            this.newEmployee_phone = '9876567876'
            this.newEmployee_password = 'Swati@97'
            this.newEmployee_role = 'Technician'

            this.deleteEmp = 'cribroirupixeu-1378@yopmail.com'
            this.activate = 'rockyy@yopmail.com'
            this.deactivate = 'aun@yopmail.com'
            this.searchEmail = 'tecd@yopmail.com'

            //order with promocode
            this.promoCode = 'EntireAny45%'


            //promoCode

                this.promoHistory = '50%EntireRush',
                this.deleteCode = '5$Rush',
                this.deactivateCode = 'Comprehensive100$',
                this.activateCode = '50%EntireRush',

                //promocode creation for order

                this.order_code = '64%Single',
                this.order_desc = '64%Single',
                this.order_value = '64',
                this.order_type = 'P', // P = percentage, F = fixed
                this.order_orderType = 'Single Report',
                this.order_reportType = 'Any', // Basic Standard Comprehensive Claims Any
                this.order_startDate = '2025-11-05',
                this.order_endDate = '2026-12-21',
                this.order_limit = '10'
            //promocode creation for Account Credits

                this.credit_code = 'Claims45%',
                this.credit_desc = 'Claims45%',
                this.credit_value = '45',
                this.credit_type = 'P', // fixed amount
                this.credit_reportType = 'Claims',


                //promocode  creation for Rush Delivery

                this.rushDelivery_code = '43%Rush',
                this.rushDelivery_desc = '43%Rush',
                this.rushDelivery_value = '43',
                this.rushDelivery_type = 'P', // percentage
                this.rushDelivery_orderType = 'Single Report', // Entire Order/Single Report

                //order
            this.updateOrder_orderId = '149376'
            this.updateOrder_zip = '54321'
            this.updateOrder_latLon = '78.7460146,-77.9833113'
            this.updateOrder_ccemail = 'swatinagula7@gmail.com'
            this.updateOrder_managerNotes = 'This is testing'
            this.updateOrder_productionNotes = 'This is testing'

            this.downloadOrder = '149001'
            this.resendReceipt = '149163'
            this.street = '616 Denson Street'
            this.assigntech_orderId = '149038'
            this.technician = 'ted' //ted,Mark

            //upload files
            this.uploadFiles_orderId = '149154'
            this.uploadFiles_file1 = path.join(
                __dirname,
                '../tests/Orders/orderFiles/order1.RCG'
            );

            this.uploadFiles_file2 = path.join(
                __dirname,
                '../tests/Orders/orderFiles/order2.ESX'
            );
            this.reportType_type = 'standard'
            this.deliveryType_type = 'normal'

            //order delivery
            this.Orderdelivery_orderId = '148723'

            //refund order
            
            this.refundId = '149390'
            this.refund_amount = '35'


            //orderReport

            this.orderReport_customerName = 'swati N'
            this.orderReport_location = '67 Ithica Rd, Brockton, MA 02302, USA'
            this.orderReport_city = 'Brockton'
            this.orderReport_reportType = 'Claims'
            this.orderReport_promoCode = 'EntireAny45%'
            this.orderReport_deliveryType = 'normal'

            // orderMultipleReport (for loop usage)
            this.orderMultipleReport = {
                cardLast4: this.cardLast4,
                reports: [
                    {
                        location: '1004 North White Oak Road White Oak Texas 75693',
                        city: 'White Oak',

                    },
                    {
                        location: '5342 N Nevada Ave, Colorado Springs, CO 80918, USA',
                        city: 'Colorado',

                    }
                ]
            };



            //changeOrder
            this.changeOrder_orderId = '149242',
                this.changeOrder_reportType = "comprehensive",
                this.changeOrder_quantity = '1',
                this.changeOrder_deliveryType = false,
                this.changeOrder_paymentMethod = 'Credit Card',//Package Credit


                //change status
                this.changeStatus_orderId = '149112'
            this.changeStatus_status = 'Quality Control'

            //orderStatus
            this.orderStatus_OrdersReceived = 'Orders Received',
                this.orderStatus_PendingNeedInfo = 'Pending Need Info',
                this.orderStatus_InQueue = 'In Queue',
                this.orderStatus_Assigned = 'Assigned',
                this.orderStatus_InProduction = 'In Production',
                this.orderStatus_QualityControl = 'Quality Control',
                this.orderStatus_Delivered = 'Delivered',
                this.orderStatus_Refunded = 'Refunded'



        }
    }