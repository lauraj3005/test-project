import { assert, describe, expect, it, beforeAll, afterAll, vi, afterEach } from 'vitest'
import request from "supertest";
import { app } from "../src/routes";
import { DatabaseSync } from 'node:sqlite';
import { mock } from 'node:test';

// @ts-ignore
const { mockDatabase } = vi.hoisted(() => {
  // Use a dynamic require to safely pull node:sqlite at the very top of execution
  const { DatabaseSync } = require('node:sqlite');
  const database = new DatabaseSync(':memory:');

  // Set up your schema structure
  database.exec(`
    CREATE TABLE "Shows" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      isWatched INTEGER NOT NULL DEFAULT 0,
      rating DECIMAL,
      review VARCHAR,
      writtenBy VARCHAR,
      timesSeen INTEGER NOT NULL DEFAULT 0
    );
  `);

  database.exec(`
    INSERT into "Shows" (name, rating, review, writtenBy) values ('test show', 2, 'test review', 'test writer');
  `)

  return { mockDatabase: database };
});

// 2. Mock the file using the pre-hoisted instance
vi.mock('../src/data/database', () => {
  return {
    default: mockDatabase, // Maps to 'import database from ...'
    database: mockDatabase // Maps to 'import { database } from ...'
  };
});

describe("Musicals API", () => {

  afterEach(async () => {
    mockDatabase.exec('drop table Shows')

    mockDatabase.exec(`
    CREATE TABLE "Shows" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      isWatched INTEGER NOT NULL DEFAULT 0,
      rating DECIMAL,
      review VARCHAR,
      writtenBy VARCHAR,
      timesSeen INTEGER NOT NULL DEFAULT 0
    );
  `);

  mockDatabase.exec(`
    INSERT into "Shows" (name, rating, review, writtenBy) values ('test show', 2, 'test review', 'test writer');
  `)
  })

  it("should return a list of shows", async () => {
    const res = await request(app).get("/shows").set('Content-Type', 'application/json').set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body).toEqual([
      {
        "id": 1,
        "isWatched": 0,
        "name": "test show",
        "rating": 2,
        "review": "test review",
        "timesSeen": 0,
        "writtenBy": "test writer",
      },
    ])
  });
  it('should update a musical with new information', async () => {

    const res = await request(app).put('/shows/1').set('Content-Type', 'application/json').set('Accept', 'application/json')
      .send({
        "name": "new show - update",
        "isWatched": 1,
        "rating": 2,
        "review": "very good as well",
        "writtenBy": "Laura",
        "timesSeen": 3
      })
    expect(res.status).toBe(200) // how do we add a better response to this?
    expect(res.body).toEqual(
      {
        "id": 1,
        "name": "new show - update",
        "isWatched": 1,
        "rating": 2,
        "review": "very good as well",
        "writtenBy": "Laura",
        "timesSeen": 3
      },
    )
  });

  it("should return the musical with the Id that was sent", async () => {
    const res = await request(app).get(`/shows/1`).set('Content-Type', 'application/json').set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toEqual(
      {
        "id": 1,
        "isWatched": 0,
        "name": "test show",
        "rating": 2,
        "review": "test review",
        "timesSeen": 0,
        "writtenBy": "test writer",
      },
  );
  })
    it('should delete a musical', async () => {
        const res = await request(app).delete('/shows/1').set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.status).toEqual(200)
        const resForGet = await request(app).get("/shows/1").set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(resForGet).toBe(404)
    })

  // it("should return the correct properties", async () => {
  //   const res = await request(app).get(`/shows/${responseBodyId}`).set('Content-Type', 'application/json').set('Accept', 'application/json');
  //   expect(res.body).toHaveProperty('id');
  //   expect(res.body).toHaveProperty('name');
  //   expect(res.body).toHaveProperty('isWatched');
  //   expect(res.body).toHaveProperty('rating');
  //   expect(res.body).toHaveProperty('review');
  //   expect(res.body).toHaveProperty('writtenBy');
  //   expect(res.body).toHaveProperty('timesSeen');
  // })
  // it("should return the correct musical name", async () => {
  //   const res = await request(app).get(`/shows/${responseBodyId}`).set('Content-Type', 'application/json').set('Accept', 'application/json');
  //   expect(res.body.name).toBe(responseBodyName)
  // })
  // // it.only("should return an error if the ID doesn't exist in the db", async () => {
  // //   const res = await request(app).get(`/shows/9999`).set('Content-Type', 'application/json').set('Accept', 'application/json');
  // //   expect(res.status).toBe(404)
  // // }) HOW DO I FIX MY CODE SO IT SENDS AN ERROR IF THE ID DOESN'T EXIST???
  // it('should delete a musical', async () => {
  //   const res = await request(app).delete(`/shows/${responseBodyId}`).set('Content-Type', 'application/json').set('Accept', 'application/json');
  //   console.log(res.body)
  //   expect(res.status).toBe(200)
  //   // expect(res.body).toBe('OK') how do i test this? I want a better response
  // })


})



//   // it('should return a 404 if an invalid ID is sent', async () => {
//   //   const res = await request(app).get("/shows/1").set('Content-Type', 'application/json').set('Accept', 'application/json');
//   //   expect(res.status).toBe(404)
//   // }) this fails =[

//   it('should add update a musical in the db', async () => {


//   })
// });
// // write as many as integration test as possible for ALL the end points
// // Might be good to do in a specific order... Create, Get, Update, Delete
// // Have a look at beforeAll // afterAll


/* 
Questions for Sam
  1. How can I send different error response
  2. If there's no musicals in the DB, when I create a new one why is the ID not 1 and like 150 instead? How can I change it so it goes back to 1?
  4. I want to create a certain amount of shows, then delete them all at the end of the cycle. How do I save all the IDs created if I do a beforeEach? so I can use different data for different tests?
*/


// HW fix the get endpoint when there's no musicals