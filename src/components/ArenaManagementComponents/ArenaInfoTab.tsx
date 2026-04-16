/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDataCitysByCountry,
  getDataCountrys,
  type cityProps,
  type countryProps,
} from "country-state-city-nextjs";

const ArenaInfoTab = () => {
  const [countries, setCountries] = useState<countryProps[]>([]);
  const [cities, setCities] = useState<cityProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [selectedCity, setSelectedCity] = useState("Birmingham");

  useEffect(() => {
    let active = true;

    const loadCountries = async () => {
      const data = (await getDataCountrys()) as countryProps[];
      if (!active) return;

      const parsedCountries = Array.isArray(data) ? data : [];
      setCountries(parsedCountries);
      setSelectedCountry((previousCountry) => {
        const selectedExists = parsedCountries.some(
          (country) => country.text === previousCountry,
        );
        if (selectedExists) return previousCountry;
        return parsedCountries[0]?.text ?? "";
      });
    };

    loadCountries();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadCities = async () => {
      const country = countries.find((item) => item.text === selectedCountry);
      if (!country) {
        setCities([]);
        setSelectedCity("");
        return;
      }

      const data = (await getDataCitysByCountry({
        id: country.id,
        text: country.text,
      })) as cityProps[];

      if (!active) return;
      const parsedCities = Array.isArray(data) ? data : [];
      setCities(parsedCities);

      setSelectedCity((previousCity) => {
        const cityExists = parsedCities.some(
          (city) => city.text === previousCity,
        );
        if (cityExists) return previousCity;
        return parsedCities[0]?.text ?? "";
      });
    };

    loadCities();

    return () => {
      active = false;
    };
  }, [countries, selectedCountry]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Tell Us About Your Field
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            This information will be visible to players when they browse and
            book sessions at your arena.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="w-fit flex items-center gap-2"
        >
          <Pen className="w-4 h-4" />
          Edit Information
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Field / Arena Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Field / Arena Name
          </label>
          <Input
            placeholder="Toggle Fun Club"
            defaultValue="Toggle Fun Club"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Description
          </label>
          <Textarea
            placeholder="Describe your arena..."
            defaultValue="A fully equipped outdoor paintball arena designed for competitive and social matches. The field features tactical obstacles, safety-controlled zones, and structured layouts suitable for team-based gameplay."
            readOnly
            className="bg-input/30 border-white/10 text-primary min-h-[100px]"
          />
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Country</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.text}>
                    {country.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full bg-input/30 border-white/10 text-primary h-11">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.text}>
                    {city.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Full Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Full Address
          </label>
          <Input
            placeholder="Enter your full address"
            defaultValue="Flat 4B, 27 Maple Grove, Birmingham, West Midlands, United State"
            readOnly
            className="bg-input/30 border-white/10 text-primary h-11"
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaInfoTab;
