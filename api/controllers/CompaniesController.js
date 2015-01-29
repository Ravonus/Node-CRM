/**
 * CompaniesController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

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
    },

    findByName: function (req, res) {
        var companyName = req.param('companyName');
        Companies.native(function (err, companies) {
            if (companies.length < 0) res.send(400);
            companies.find({
                companyName: new RegExp(companyName)
            }, {
                companyName: true,
                email: true,
                location: true,
                billing: true
            }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },

        findByClientName: function (req, res) {
        var companyName = req.param('companyName');
        Users.native(function (err, companies) {
            if (companies.length < 0) res.send(400);
            companies.find({
                firstName: new RegExp(companyName)
            }, {
                company: true,
                email: true,
                location: true,
                billing: true
            }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },


    casDelete: function (req, res) {

        var companyName = req.param('companyName');

        Companies.destroy({
            companyName: companyName
        }).exec(function (err, companies) {
            if (err) {
                return res.serverError();
            }
            var companyIds = companies.map(function (company) {
                return company.id;
            });
            Users.destroy({
                company: companyIds
            }).exec(function (err, users) {
                console.log(companyName);
            });
        });

    },

    casDeleteId: function (req, res) {

        var companyName = req.param('companyName');

        Companies.destroy({
            id: companyName
        }).exec(function (err, companies) {
            if (err) {
                return res.serverError();
            }
            var companyIds = companies.map(function (company) {
                return company.id;
            });
            Users.destroy({
                company: companyIds
            }).exec(function (err, users) {
                console.log(companyName);
            });
        });

    }
};
