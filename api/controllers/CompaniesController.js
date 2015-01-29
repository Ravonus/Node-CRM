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
        Companies.findByCompanyName(companyName).exec(function (err, companies) {
            if (companies.length < 1) {
                res.send(400);
            } else {
                res.send(companies);
            }
        });
    },

        casDelete: function (req, res) {

    var companyName = req.param('companyName');

    Companies.destroy({companyName:companyName}).exec(function(err, companies) {
   if (err) {return res.serverError();}
        var companyIds = companies.map(function(company){return company.id;});
   Users.destroy({company:companyIds}).exec(function(err, users) {
      console.log(companyName);
   });
});




    },

        findByName2: function (req, res) {
        //console.log(Companies);
        var companyName = req.param('companyName');
        console.log(companyName);
        Companies.findByCompanyName(companyName).exec(function (err, companies) {
            if (companies.length < 1) {
                res.send(400);
            } else {
                res.send(companies);
            }
        });
    }

};



