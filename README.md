# recruitment-node-test
A small test for back-end Javascript candidates

# Candidate's notes: 

## How to run the code:

Before running the below command you need to install typescript.
In your terminal run: `npm run start` to run the code.

# Test instructions
## Overview

Please spend up to 2 hours on this coding challenge. Note that we don't expect you to complete everything listed in the requirements. We have included more than 2 hours worth of work to allow you to still complete some parts if you get stuck. We prefer you to provide less code that is well structured and well tested than more code which is badly structured and has bugs. 

Please submit your finished code as a public git repo and please make regular commits so we can understand more easily how you came to your solution. In your readme file, please include: 

- any instructions to run the code
- what you have done in the coding challenge
- any further improvements you could make
- any problems you faced

If you have any questions about the coding challenge, please email recruitment@pimberly.com

## Requirements

Build a node script to import product details from a CSV file. Typescript is optional but very welcome. 

The CSV file format is:

SKU,Colour,Size

All fields are required and SKU is the unique identifier for the product. 

Any rows with missing fields should be skipped. Any rows with a duplicate SKU in the file should be skipped.

A message should be output for each skipped row, with the reason. 

Once the script has finished, it should output a summary message showing... 

Number of products created
Number of products unchanged
Number of rows skipped

The preferred option is to save the products into a Mongo database and use Mongoose to model the data. If you don't know how to do this, you can save the products to a JSON file instead.

If you are familiar with jest, please include some unit tests to demonstrate your knowledge of the framework.

If you have time, provide an API to return a list of products with filter options for Colour and Size. 

## Example CSV input

SKU,Colour,Size
1,C1,S1
1,C1,S1
2,C1,
3,,S3
4,C1,S4
5,C1,S5
6,C1,S6
7,C1,S7
8,C1,S8
9,C1,S9
 
Which should generate the following first time it is run:

Number of products created: 6
Number of products unchanged: 0
Number of rows skipped: 4

And on subsequent occasions:

Number of products created: 0
Number of products unchanged: 6
Number of rows skipped: 4
