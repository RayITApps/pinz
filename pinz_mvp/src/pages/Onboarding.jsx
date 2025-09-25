import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";

const EXPERIENCE_LEVELS = ["New to Industry", "Some Experience", "Experienced", "Expert"];
const ROLES = ["Cook", "Barista", "Bartender", "Manager", "Restaurateur"];
const EQUIPMENT_TYPES = ["Combi Ovens", "Espresso Machines", "Blenders", "Fryers", "Grills", "POS Systems"];

const onboardingSteps = [
  {
    title: "Welcome to Pinz",
    subtitle: "The hospitality skills passport",
    description: "Build your skills, earn certifications, and advance your career in hospitality.",
    type: "welcome"
  },
  {
    title: "Tell us about yourself",
    subtitle: "Help us personalize your experience",
    description: "What's your experience level in the hospitality industry?",
    type: "experience"
  },
  {
    title: "What's your role?",
    subtitle: "Select all that apply",
    description: "This helps us recommend the right courses for you.",
    type: "roles"
  },
  {
    title: "Equipment experience",
    subtitle: "What equipment have you worked with?",
    description: "Select any equipment you've used before.",
    type: "equipment"
  },
  {
    title: "Complete your profile",
    subtitle: "Add a photo and resume",
    description: "Make your profile professional for employers to discover.",
    type: "profile"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    experience_level: "",
    roles: [],
    equipment_experience: [],
    profile_photo_url: "",
    resume_url: ""
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = async (file, type) => {
    setUploading(true);
    try {
      const result = await UploadFile({ file });
      setFormData({
        ...formData,
        [type]: result.file_url
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleSelection = (field, value) => {
    const current = formData[field];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    
    setFormData({ ...formData, [field]: updated });
  };

  const completeOnboarding = async () => {
    try {
      await User.updateMyUserData({
        experience_level: formData.experience_level,
        roles: formData.roles,
        equipment_experience: formData.equipment_experience,
        profile_photo_url: formData.profile_photo_url,
        resume_url: formData.resume_url,
        onboarding_completed: true
      });
      navigate(createPageUrl('Home'));
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const canProceed = () => {
    switch (currentStepData.type) {
      case "welcome": return true;
      case "experience": return formData.experience_level !== "";
      case "roles": return formData.roles.length > 0;
      case "equipment": return true; // Optional step
      case "profile": return true; // Optional step
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex gap-2">
          {onboardingSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-blue-600 w-6' : index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button 
          variant="ghost"
          onClick={completeOnboarding}
          className="text-gray-600"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h1>
            <p className="text-lg text-gray-600 mb-2">{currentStepData.subtitle}</p>
            <p className="text-gray-500">{currentStepData.description}</p>
          </div>

          {/* Welcome Step */}
          {currentStepData.type === "welcome" && (
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🏆</span>
              </div>
            </div>
          )}

          {/* Experience Level Step */}
          {currentStepData.type === "experience" && (
            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map(level => (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all ${
                    formData.experience_level === level ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setFormData({ ...formData, experience_level: level })}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{level}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Roles Step */}
          {currentStepData.type === "roles" && (
            <div className="space-y-3">
              {ROLES.map(role => (
                <Card 
                  key={role}
                  className={`cursor-pointer transition-all ${
                    formData.roles.includes(role) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleSelection('roles', role)}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Equipment Step */}
          {currentStepData.type === "equipment" && (
            <div className="grid grid-cols-2 gap-3">
              {EQUIPMENT_TYPES.map(equipment => (
                <Card 
                  key={equipment}
                  className={`cursor-pointer transition-all ${
                    formData.equipment_experience.includes(equipment) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleSelection('equipment_experience', equipment)}
                >
                  <CardContent className="p-3">
                    <div className="text-sm font-medium text-center">{equipment}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Profile Step */}
          {currentStepData.type === "profile" && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Profile Photo</h3>
                  {formData.profile_photo_url ? (
                    <div className="flex items-center gap-3">
                      <img 
                        src={formData.profile_photo_url} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('photo-upload').click()}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById('photo-upload').click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                  )}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'profile_photo_url')}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Resume/CV</h3>
                  {formData.resume_url ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Resume uploaded</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('resume-upload').click()}
                      >
                        Replace
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => document.getElementById('resume-upload').click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Resume'}
                    </Button>
                  )}
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'resume_url')}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6">
        <Button 
          onClick={handleNext}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          disabled={!canProceed()}
        >
          {currentStep === onboardingSteps.length - 1 ? "Complete Setup" : "Continue"}
          {currentStep < onboardingSteps.length - 1 && (
            <ChevronRight className="w-5 h-5 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
}