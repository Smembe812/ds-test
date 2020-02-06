(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['handlebar.example.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstname") || (depth0 != null ? lookupProperty(depth0,"firstname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstname","hash":{},"data":data,"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":16}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastname") || (depth0 != null ? lookupProperty(depth0,"lastname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastname","hash":{},"data":data,"loc":{"start":{"line":1,"column":17},"end":{"line":1,"column":29}}}) : helper)))
    + "</p>";
},"useData":true});
})();