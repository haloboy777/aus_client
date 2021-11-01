# AUS Movie Map

## [Demo](https://aus.ayushsingh.dev)

Problem
-------
A service that shows on a map where movies have been filmed in San
Francisco. The user can filter the view using autocompletion search.

Solution
--------
The solution focuses on Full Stack implementation.

Stack: 
* React-TypeScript
* Mapbox
* Nodejs
* MySQL 

Reasoning
---------
The reasoning behind the stack was to keep the data retrieval and display as decoupled as possible. Thus a API based solution was chosen.

For making autocomplete feature, MySQL was chosen over elasticsearch because of the size of the data (around thousand rows) and FullText Search feature of MySQL serves equally well. Otherwise the autocomplete feature can be implemented by elasticsearch as well with ease.

For frontend I chose React and Material-UI as it allowed me to iterate on the implementation quickly without focusing much on the design side of things.

Trade-offs
---------
- Would've implemented elasticsearch for big enough data (above 500MBs) and if had more time.
- Added keyboard shortcuts.
- Would've got feedback and made those changes.

Scalability
-----------
The application can be made scalable after modifying few things. The application already uses pool for managing MySQL connections and work can be done on that. And the files can be served using a CDN to make content delivery faster, and instead of Nodejs we can use Rust.

Production-readiness
--------------------
Testing needs to be added but other than that if the product satisfies the need then it can be deployed to production. It is already running behind A nginx reverse proxy. So backend can be swaped without much hassle.


----
# This repo contains code for frontend. For backend code [click](https://github.com/haloboy777/aus_server) here.