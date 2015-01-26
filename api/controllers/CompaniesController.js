/**
 * CompaniesController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    findByName: function (req, res) {
        //console.log(Companies);
        var companyName = req.param('companyName');
        console.log(companyName);
        Companies.findOneByCompanyName(companyName).exec(function (err, companies) {
            if (err) {
                res.send(400);
                console.log(companyName);
            } else {
                console.log('I found it!! I really really did!!');
                res.send(companies);
            }
        });
    }

};
