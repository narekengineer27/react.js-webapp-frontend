export const sampleResponse = {
  categories: {
    type: "tree",
    items: [
      {
        label: "Plastics",
        items: [
          {
            value: "91",
            label: "Abs"
          },
          {
            value: "100",
            label: "Acrylic"
          },
          {
            value: "208",
            label: "BOPP"
          }
        ]
      },
      {
        label: "Additives & Filters",
        items: [
          {
            value: "201",
            label: "Calcium Carbonate"
          },
          {
            value: "202",
            label: "Calcium sulfate"
          }
        ]
      },
      {
        label: "Others",
        items: [
          {
            value: "223",
            label: "Cardboard (OCC)"
          }
        ]
      }
    ]
  },
  conditions: {
    type: "tree",
    items: [
      {
        label: "Recycled",
        items: [
          {
            value: "8",
            label: "Baled"
          },
          {
            value: "11",
            label: "Densified"
          }
        ]
      },
      {
        label: "Virgin",
        items: [
          {
            value: "101",
            label: "Branded Prime"
          }
        ]
      }
    ]
  },
  productCodes: {
    type: "tree",
    items: [
      {
        label: "Recyclable Plastics",
        items: [
          {
            value: "1",
            label: "391510"
          }
        ]
      },
      {
        label: "Prime Plastics",
        items: [
          {
            value: "7",
            label:
              "390110 - Polyethylene with specific gravity less than 0.94 in Primary form"
          }
        ]
      }
    ]
  },
  packagings: {
    type: "list",
    items: [
      {
        value: "1",
        label: "Bin"
      },
      {
        value: "2",
        label: "Bottle"
      },
      {
        value: "3",
        label: "Jar"
      }
    ]
  },
  units: {
    type: "list",
    items: [
      {
        value: "1",
        label: "lb"
      },
      {
        value: "2",
        label: "mt"
      },
      {
        value: "3",
        label: "kg"
      }
    ]
  },
  supplies: {
    type: "list",
    items: [
      {
        value: "1",
        label: "One-off"
      },
      {
        value: "2",
        label: "Ongoing"
      }
    ]
  },
  countries: {
    type: "list",
    items: [
      {
        value: "1",
        label: "Afghanistan"
      },
      {
        value: "2",
        label: "Aland Islands"
      }
    ]
  },
  pricingTerms: {
    type: "list",
    items: [
      {
        value: "1",
        label: "EXW"
      },
      {
        value: "2",
        label: "FCA"
      }
    ]
  },
  geographies: {
    type: "list",
    items: [
      {
        value: "1",
        label: "All countries"
      },
      {
        value: "2",
        label: "Only United States"
      }
    ]
  },
  users: {
    type: "list",
    items: [
      {
        value: "1",
        label: "All users"
      },
      {
        value: "2",
        label: "Premium users only"
      }
    ]
  }
};
