# node-open-ticket

NodeJS module to manage event ticket sale

## Description

This module connects to provided mongodb instance and provide an api to manage events ticket sales. The API will be organized in three subsequent layers:

* JS module API: provide functions to manage event tickets sales
* REST API: provide a middleware that set HTTP routes to interface with the above API
* Web UI: provide an interface to interact with the above HTTP routes.

## Database

The ticket sale is organized around the following concepts:

* Event: named and dated event for which tickets are sold
* Ticket Group: group of tickets following the same pricing. Tickets within a group can be limited in time and numbers
* Ticket Instance: instance of a ticket within a group, created upon purchase, associated with stripe payment details
* Attendee: personal details and list of ticket instances purchased

## Integrations

The module integrates with the following modules and services:

* A MongoDB instance for database management, connection URI and credentials to be provided when initializing the module
* A Stripe account for payment processing, credentials to be provided when initializing the module
* Express, if using the middleware API or Web UI, providing authentication. Admin auth uses basic HTTP authentication with a password provided at init time.
