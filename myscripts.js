
// called once the DOM is loaded and ready
$(document).ready(function () {

	// if user presses enter input textbox is selected, search button click event is triggered
	$(document.body).delegate('input:text', 'keypress', function(event) {

	    if (event.which === 13) {		// if user presses enter/return

	        event.preventDefault();		// cancels event - prevents form from submitting

	        $("#userInput").blur();		// hides keyboard when viewing app on iphone

	        $("#searchBtn").click();	// search button click event triggered
	    }

	});

	// called when user clicks search button
	$("#searchBtn").click(function() {

		var input = $("#userInput").val();	//selects the user's text input

		// getJSON is an Ajax shortcut that loads JSON-encoded data from server using a GET HTTP
		// request and returns a xmlhttprequest(jqXHR) object, which implements Promise interface 
		// allowing multiple callback functions on a single request
		$.getJSON("products.json").done(function(data) {	// executed when request is successful

			//console.log('success');

    		var productArray = data.products;	// creates array of objects from jqXHR object

    		// sorts array alphabetically based on name property
			var sortProductArray = productArray.sort(function(a,b) {
				
				if (a.name < b.name)
					return -1;
				if (a.name > b.name)
					return 1;
				return 0;

			});
			
			var filteredData = $("#filteredData");	// selects div with id filteredData

			filteredData.empty();	// clears div (fresh results each time user searches)

			// grep function filters array - compares user's input with name and type properties
			var filteredProducts = $.grep(sortProductArray, function(product) {

				// removes redundant info from every object name - ie (US) - bank
				product.name = product.name.split("(US)")[0].replace(/(\s[-])((\s)([a-zA-Z'-]+))*/gm, "");
				
				if (product.type === "CREDIT_CARD") {
					product.type = product.type.replace("_", " ");	// adds space to credit card type
				}

				// changes user input, name, and type to lowercase with no spaces - gives user more
				// search flexibility
				input = input.toLowerCase().replace(/ /g, "");

				var name = product.name.toLowerCase().replace(/ /g, "");

				var type = product.type.toLowerCase().replace(/ /g, "");


				var searchName = name.indexOf(input);
				var searchType = type.indexOf(input);

				return searchName >= 0 || searchType >= 0;

			});


			// removes duplicate objects from filtered array (same name, type, and url)
			filteredProducts = _.uniq(filteredProducts, function(product) {
				return JSON.stringify(_.pick(product, ["name", "type", "url"]));
			});
			
			// groups array by object name - returns object containing elements (key:value) where
			// key = each object name and value = filtered array by same object name
			var groupByName = _.groupBy(filteredProducts, "name");

			// combines products in array that have same name and url, but different types 
			// maps a reduce function onto above filtered object
			filteredProducts = _.map(groupByName, function(vals, name) {

			    return _.reduce(vals, function(memo, objects) {

			        for (var key in objects) {
			            if (key != "name") {
			                memo[key] = (memo[key]||"") + objects[key] + " ";
			            }
			        }

			        return memo;

			    }, {name: name});

			});

			// corrects (adds spaces/ removes symbols) object properties in new filtered array
			_.each(filteredProducts, function(product) {

				product.name = product.name.slice(0,-1);

				product.type = product.type.slice(0,-1).replace(/ /g, ", ").replace(", CA", " CA");

				product.url = product.url.slice(0,-1).split(" ")[0];

			});

			// renders template to HTML using filtered data
			$(function () {

			  var templateScript = $("#Handlebars-Template").html();	// grabs template script

			  var template = Handlebars.compile(templateScript);	// compiles template

			  
			  var compiledHtml = template(filteredProducts);	// passes filtered array to template

			  $("#filteredData").html(compiledHtml);	// adds compiled html to div

			});

			// adds product website favicon next to every link using social bookmarking service
			// provided by Google Shared Stuff
			$("a[href^='http']").each(function() {

			    $(this).css({
			        background: "url(https://www.google.com/s2/favicons?domain_url=" + (this.href) + 
			        ") left center no-repeat",
			        "padding-left": "20px"
			    });

			});

			// calls Pagination Plugin on table if needed
			if (filteredProducts.length >= 25) {

				$(".table").paging({limit: 25});

			}
			
    	})
    	.error(function() {		// executed when request failed

    		//console.log("error");

    	})
    	.always(function() {	// executed when request has completed whether it was successful or not

    		//console.log("completed");

    	});

	});

	


});
