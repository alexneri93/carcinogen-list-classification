const { describe, it } = require('node:test');
const assert = require('node:assert');

const { carcinogenListSearch } = require('../dist/index.js');
const carcinogensFullList = require('../src/data/carcinogens_list_classification.json');
// import carcinogensFullList from '../src/data/carcinogens_list_classification.json';

describe('carcinogenListSearch', () => {
    it('should return an array ', () => {
        let options = {keywords: ["acid"]}
        let result = carcinogenListSearch(options)
        assert.strictEqual(typeof result, 'object');
    });

    it('should return an array ', () => {
      let result = carcinogenListSearch({})
      let arrayLength = result.length
      let fullListLength = carcinogensFullList.filter(c => c.group !== "").length
      assert.equal(arrayLength, fullListLength);
    });

    it('should return agents containing a keyword', () => {
        let options = {keywords: ["aloe"]}
        let result = carcinogenListSearch(options)
        let expected = [
            {
              agent: 'Aloe vera, whole leaf extract',
              group: '2B',
              volume: '108',
              volumePublicationYear: '2016',
              evaluationYear: '2013',
              additionalInformation: ''
            }
          ]
        assert.deepEqual(result, expected);
    });

    it('should return agents that match the keywords', () => {
        let options = {keywords: ["aloe", "pfoa"]}
        let result = carcinogenListSearch(options)
        let expected = [
            {
              agent: 'Perfluorooctanoic acid (PFOA)',
              group: '1',
              volume: '110, 135',
              volumePublicationYear: '2025 online',
              evaluationYear: '2023',
              additionalInformation: ''
            },
            {
              agent: 'Aloe vera, whole leaf extract',
              group: '2B',
              volume: '108',
              volumePublicationYear: '2016',
              evaluationYear: '2013',
              additionalInformation: ''
            }
          ]
        assert.deepEqual(result, expected);
    });

    it('should filter agents by group', () => {
        let options = {groups: ["2A"]}
        let result = carcinogenListSearch(options)
        let arrayLength = result.length
        let filteredresultLength = result.filter(item => item.group === "2A").length

        assert.equal(arrayLength, filteredresultLength);
    });

    it('should filter agents by multiple groups', () => {
        let options = {groups: ["1","2A"]}
        let result = carcinogenListSearch(options)
        let arrayLength = result.length
        let filteredresultLength = result.filter(item => item.group === "1" || item.group === "2A").length

        assert.equal(arrayLength, filteredresultLength);
    });

    it('should sort the results by agent descendant', () => {
        let options = {sortBy: "agent", sortMethod: "desc", keywords: ["aloe", "pfoa"]}
        let result = carcinogenListSearch(options)
        let expected = [
            {
              agent: 'Perfluorooctanoic acid (PFOA)',
              group: '1',
              volume: '110, 135',
              volumePublicationYear: '2025 online',
              evaluationYear: '2023',
              additionalInformation: ''
            },
            {
              agent: 'Aloe vera, whole leaf extract',
              group: '2B',
              volume: '108',
              volumePublicationYear: '2016',
              evaluationYear: '2013',
              additionalInformation: ''
            }
          ]

        assert.deepEqual(result, expected);
    });

    it('should sort the results by agent ascendant', () => {
        let options = {sortBy: "agent", sortMethod: "asc", keywords: ["aloe", "pfoa"]}
        let result = carcinogenListSearch(options)
        let expected = [
            {
                agent: 'Aloe vera, whole leaf extract',
                group: '2B',
                volume: '108',
                volumePublicationYear: '2016',
                evaluationYear: '2013',
                additionalInformation: ''
            },
            {
                agent: 'Perfluorooctanoic acid (PFOA)',
                group: '1',
                volume: '110, 135',
                volumePublicationYear: '2025 online',
                evaluationYear: '2023',
                additionalInformation: ''
            }
        ]

        assert.deepEqual(result, expected);
    });
});