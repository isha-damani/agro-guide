import { useState } from 'react';
import { Loader2, FlaskConical, Thermometer, CloudRain, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface SoilFormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  rainfall: string;
  city: string;
}

interface SoilFormProps {
  onSubmit: (data: SoilFormData) => void;
  isLoading: boolean;
  onCityChange: (city: string) => void;
}

const SoilForm = ({ onSubmit, isLoading, onCityChange }: SoilFormProps) => {
  const [formData, setFormData] = useState<SoilFormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    rainfall: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'city') {
      onCityChange(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputGroups = [
    {
      title: 'Soil Nutrients',
      icon: FlaskConical,
      inputs: [
        { name: 'nitrogen', label: 'Nitrogen (N)', placeholder: 'e.g., 90', unit: 'mg/kg' },
        { name: 'phosphorus', label: 'Phosphorus (P)', placeholder: 'e.g., 42', unit: 'mg/kg' },
        { name: 'potassium', label: 'Potassium (K)', placeholder: 'e.g., 43', unit: 'mg/kg' },
        { name: 'ph', label: 'Soil pH', placeholder: 'e.g., 6.5', unit: 'pH' },
      ],
    },
    {
      title: 'Weather Conditions',
      icon: Thermometer,
      inputs: [
        { name: 'temperature', label: 'Temperature', placeholder: 'e.g., 25', unit: '°C' },
        { name: 'rainfall', label: 'Rainfall', placeholder: 'e.g., 200', unit: 'mm' },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {inputGroups.map((group, groupIndex) => (
        <Card 
          key={group.title} 
          className="p-6 bg-card border-0 card-3d cursor-default animate-fade-up"
          style={{ animationDelay: `${0.1 * groupIndex}s` }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shadow-soft transition-transform duration-200 hover:scale-105">
              <group.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-foreground">{group.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.inputs.map((input) => (
              <div key={input.name} className="space-y-2">
                <Label htmlFor={input.name} className="text-sm font-medium text-foreground">
                  {input.label}
                </Label>
                <div className="relative group">
                  <Input
                    id={input.name}
                    name={input.name}
                    type="number"
                    step="any"
                    placeholder={input.placeholder}
                    value={formData[input.name as keyof SoilFormData]}
                    onChange={handleChange}
                    required
                    className="pr-14 input-3d bg-background"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-colors group-focus-within:text-primary">
                    {input.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Location Card */}
      <Card 
        className="p-6 bg-card border-0 card-3d cursor-default animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shadow-soft transition-transform duration-200 hover:scale-105">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-serif font-semibold text-lg text-foreground">Location</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-foreground">
            City / Location
          </Label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="e.g., Mumbai"
            value={formData.city}
            onChange={handleChange}
            required
            className="input-3d bg-background"
          />
        </div>
      </Card>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full card-3d"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <CloudRain className="w-5 h-5" />
            Get Crop Recommendation
          </>
        )}
      </Button>
    </form>
  );
};

export default SoilForm;
