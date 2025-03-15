# Carcinogenic Agents - List of Classifications

**carcinogen-list-classification** is a package that provides a javascript function that returns an array of objects containing information about all the carcicogenic agents (substances that can cause cancer) according to the [IARC Monographs](https://monographs.iarc.who.int/list-of-classifications/).  

Carcinogens are clasified into 5 groups:

| Group         | What does it mean?             |
| ------------- |------------------------------|
| 1             | Carcinogenic to humans         |
| 2A            | Probably carcinogenic to humans|
| 2B            | Possibly carcinogenic to humans|
| 3             | Carcinogenity not classifiable |
| 4             | Probably not carcinogenic      |

The information provided by this list includes:

* Agent
* Group
* Volume
* Volume publication year
* Evaluation year
* Additional information

Example of the returned data:

```typescript
[
  {
    agent: "Perfluorooctanoic acid (PFOA)",
    group: "1",
    volume: "110, 135",
    volumePublicationYear: "2025 online",
    evaluationYear: "2023",
    additionalInformation: ""
  },
  ...
]
```

## How to install the package
The Carcinopgenic Agents - List of Classifications package can be installed with `npm`:

```
npm install carcinogen-list-classification
```

## How to retrieve the information

The package can be imported in the code using `require` or `import`:

```typescript
const { carcinogenList } = require('carcinogen-list-classification')
```

```typescript
import { carcinogenList } from 'carcinogen-list-classification'
```

To get the information run the following, where `<SEARCH_OPTIONS>` is a Javascript object that contains the configuration of the search:

```typescript
const list = carcinogenList( <SEARCH_OPTIONS> )
```

### Options
| Name         | Type             | Default         | Description |
| ------------- | ------------- |------------------|------------------|
| groups     | array    | ["1", "2A", "2B", "3", "4"]  | Returns carcinogens belonging to the specified groups.  |
| sortBy    | string    | "group"| Sorts by the specified field. The possible fields are `"agent"`, `"group"`, `"volume"`, `"volumePublicationYear"`, `"evaluationYear"`, `"additionalInformation"`|
| sortMethod    | string    | "asc"| How to sort the search, can be ascendant or descendant. Possible options are `"asc"` and `"desc"`.  |
| keywords     | array      | [""] | Returns carcinogens that contains the specified keywords. If none are provided, it returns all.  |

### Examples
```typescript
// Returns all the list
carcinogenList({})

// Only carcinogens belonging to groups 3 and 4
carcinogenList({ groups: ["3", "4"] })

// Only carcinogens containing the keyword "virus" belonging to group 1
carcinogenList({ keywords: ["virus"], groups: ["1"] })

// Sort the result by agent name in descending order and returns only carcinogens belonging to group 2A
carcinogenList({ sortBy: "agent", sortMethod: "desc", groups: ["2A"] })
```