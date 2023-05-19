const moment = require('moment');
const _ = require('lodash');

exports.validate = (receipt_info) => {
    let errors = new Map()
    
    if (_.isEmpty(receipt_info)) {
        errors.set("receipt","empty request")
        return errors
    }

    // validate retailer field
    if (receipt_info.hasOwnProperty('retailer')) {
        const retailer = receipt_info.retailer
        if (retailer == "") {
            errors.set("retailer", "provide non-empty retailer value")
        }
    } else {
        errors.set("retailer", "provide non-empty retailer value")
    }

    // validate purchase date
    if (receipt_info.hasOwnProperty('purchaseDate')) {
        const purchaseDate = receipt_info.purchaseDate
        // check if purchaseDate is empty
        if (purchaseDate == "") {
            errors.set("purchaseDate", "provide non-empty purchaseDate value")
        }
        // check if purchaseDate is valid
        const isValidDate = moment(purchaseDate, 'YYYY-MM-DD', true).isValid();
        if (!isValidDate) {
            errors.set("purchaseDate", "provide valid date value")
        }
    } else {
        errors.set("purchaseDate", "provide non-empty purchaseDate value")
    }

    // validate purchase time
    if (receipt_info.hasOwnProperty('purchaseTime')) {
        const purchaseTime = receipt_info.purchaseTime
        // check if purchaseTime is empty
        if (purchaseTime == "") {
            errors.set("purchaseTime", "provide non-empty purchaseTime value")
        }
        // check if purchaseTime is valid
        const isValidTime = moment(purchaseTime, 'HH:mm', true).isValid();
        if (!isValidTime) {
            errors.set("purchaseTime", "provide valid time value")
        }
    } else {
        errors.set("purchaseTime", "provide non-empty purchaseTime value")
    }

    // validate total field
    if (receipt_info.hasOwnProperty("total")) {
        let total = receipt_info.total        
        // check if total is empty
        if (total.trim() == "") {
            errors.set("total", "provide non-empty total value")
        }

        total = total.trim()
        const parseTotal = parseFloat(total)
        if (isNaN(parseTotal)) {
            errors.set("total", "provide valid total number value")
        }
    } else {
        errors.set("total", "provide non-empty total value")
    }

    // valid items
    if (receipt_info.hasOwnProperty('items')) {
        const items = receipt_info.items
        if (items.length == 0) {
            errors.set("items", "provide items to process receipt")
        }
        for (const item of receipt_info.items) {
            if (item.hasOwnProperty("shortDescription")) {
                let shortDescription = item.shortDescription
                if (shortDescription.trim() == "") {
                    errors.set("items.shortDescription", "provide non-empty value")
                }
            } else {
                errors.set("items.shortDescription", "provide shortDescription value") 
            }

            if (item.hasOwnProperty("price")) {
                let price = item.price
                if (price.trim() == "") {
                    errors.set(`items.price`, "provide non-empty value")
                }

                validPrice = parseFloat(price)
                if (isNaN(price)) {
                    errors.set(`items.price.${price}`, "provide valid price value")
                }
            } else {
                errors.set("items.price", "provide price value") 
            }
        }
    } else {
        errors.set("items", "provide items to process receipt")
    }
     

    return errors
}