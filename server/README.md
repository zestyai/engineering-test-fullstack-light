## Setup instruction
1. Checkout the repo
1. run `docker-compose up -d` under the project folder
1. Visit `http://localhost:1235` to check Zesty.ai test result.

## Tech stack
1. Frontend: ReactJS / Redux / Material UI / [Leaflet](https://leafletjs.com) / [Mapbox](https://www.mapbox.com)
1. Backend: NodeJS / Express / Sequelize / PostgreSQL

## Features
* Find Properties module
  1. Using Leaflet and Mapbox on Find properties module, in order to provide a visible hint of the searching location.
Once user click `Search` button, the map will automatically updated and move the mark to the place.
  1. Validate searching form.

## Feedback
* I am not clear about the __statistics__ requirement mentioned in 

_Property detail page: Show detailed information about a given property, including its image, geographic location, and statistics (if applicable)._

I assume by that requirement, I should refer to table "spatial_ref_sys", but due to my limited knowledge, I cannot figure out what kind of statistic result should be generated. However, I still fetch all related info which can be returned from `http://127.0.0.1:1235/property/${property_id}`, i.e. `http://127.0.0.1:1235/property/3290ec7dd190478aab124f6f2f32bdd7`, and below is a sample response, the last item of result called 'state' hold the data.

```
{
    "status": "ok",
    "result": {
        "id": "3290ec7dd190478aab124f6f2f32bdd7",
        "geocode_geo": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Point",
            "coordinates": [
                -80.0782213,
                26.8849731
            ]
        },
        "parcel_geo": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -80.07804560009822,
                        26.885161536204812
                    ],
                    [
                        -80.07807269678385,
                        26.88461535294852
                    ],
                    [
                        -80.07810474274834,
                        26.884637193084707
                    ],
                    [
                        -80.0781944937265,
                        26.88465091931384
                    ],
                    [
                        -80.07838885138632,
                        26.884725042562923
                    ],
                    [
                        -80.07846968832513,
                        26.884748525383724
                    ],
                    [
                        -80.07862539481383,
                        26.884780836890275
                    ],
                    [
                        -80.07826362095997,
                        26.88523760482572
                    ],
                    [
                        -80.07825164573075,
                        26.88521682646835
                    ],
                    [
                        -80.07823611900693,
                        26.885198032726873
                    ],
                    [
                        -80.07821744043223,
                        26.88518170733296
                    ],
                    [
                        -80.07819609077508,
                        26.885168270485348
                    ],
                    [
                        -80.07817261955425,
                        26.885158068034432
                    ],
                    [
                        -80.07814763089469,
                        26.885151362580498
                    ],
                    [
                        -80.07812176797832,
                        26.885148326714784
                    ],
                    [
                        -80.07809569648914,
                        26.885149038577186
                    ],
                    [
                        -80.07807008747952,
                        26.885153479845055
                    ],
                    [
                        -80.07804560009822,
                        26.885161536204812
                    ]
                ]
            ]
        },
        "building_geo": {
            "crs": {
                "type": "name",
                "properties": {
                    "name": "EPSG:4326"
                }
            },
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -80.078226,
                        26.885122
                    ],
                    [
                        -80.078318,
                        26.885172
                    ],
                    [
                        -80.078492,
                        26.884916
                    ],
                    [
                        -80.078391,
                        26.884861
                    ],
                    [
                        -80.078351,
                        26.884919
                    ],
                    [
                        -80.078194,
                        26.884834
                    ],
                    [
                        -80.078069,
                        26.885017
                    ],
                    [
                        -80.078136,
                        26.885054
                    ],
                    [
                        -80.078167,
                        26.885008
                    ],
                    [
                        -80.078266,
                        26.885062
                    ],
                    [
                        -80.078226,
                        26.885122
                    ]
                ]
            ]
        },
        "image_bounds": [
            -80.0786402821541,
            26.8845993458896,
            -80.0778020918369,
            26.8853469410407
        ],
        "image_url": "https://storage.googleapis.com/engineering-test/images/3290ec7dd190478aab124f6f2f32bdd7.tif",
        "stats": [
            {
                "srid": 4326,
                "auth_name": "EPSG",
                "auth_srid": 4326,
                "srtext": "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]",
                "proj4text": "+proj=longlat +datum=WGS84 +no_defs "
            }
        ]
    }
}
```
