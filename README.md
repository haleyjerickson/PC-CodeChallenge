# PC-CodeChallenge

# Summary
This is a one page app where a user inputs text and receives a data table containing products from the included JSON data file that match the user’s search. The results are displayed in the same page using Ajax and Handlebars.js (a templating engine). They are ranked alphabetically based on the product names.

# Additional Notes
I tried to remove most of the redundancy in the data, so the user can search through the results more quickly. For example, I removed duplicates and combined the products with the same name and url together. I also added each url’s favicon next to their link to add to the visual experience of the app and help users be able to recognize the products at a glance.

For the design of the app, I relied mostly on Bootstrap’s stylesheet, but also added a few extra class styles in mystyle.css file. I chose to display the data in a table because it is a quick way to find a product when searching through a lot of data. I used Bootstrap to create a responsive layout.

In myscripts.js file, I used Javascript Library’s, Underscore.js, helper functions to be able to filter the data based on the user’s input. I decided to also use a Javascript Pagination Plugin because I wanted the app to be scalable and still user friendly. The paging.js file is taken from this plugin. http://www.jqueryscript.net/table/Client-side-HTML-Table-Pagination-Plugin-with-jQuery-Paging.html

Since I already had an account with Eco Web Hosting (https://www.ecowebhosting.co.uk/), I uploaded my files to their server to test my app. Here is a demo link: http://176.32.230.50/haleyerickson.com/

If I had more time, I would try to fix the broken url links for some of the products, maybe group products by company, find a more unique way to rank the search results (i.e. show products closest to the user first), and I might also add another user input to further filter the results by user’s product type preference.
