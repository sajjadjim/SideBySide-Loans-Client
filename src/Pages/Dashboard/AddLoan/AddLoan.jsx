// AddLoan.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign,
  FileText,
  Image as ImageIcon,
  Upload,
  Plus,
  X,
  Loader,
  CheckCircle,
  AlertCircle,
  Percent,
  Eye,
  EyeOff,
  List,
  Tag
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddLoan = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [showOnHome, setShowOnHome] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [requiredDocs, setRequiredDocs] = useState(['Government ID', 'Proof of Address']);
  const [newDoc, setNewDoc] = useState('');
  const [emiPlans, setEmiPlans] = useState(['6', '12']);
  const [newEmi, setNewEmi] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('image', file);

      // Upload to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );

      const imageUrl = response.data.data.url;
      setImagePreview(imageUrl);
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  //  ADD 
  const handleAddDocument = () => {
    if (newDoc.trim() && !requiredDocs.includes(newDoc.trim())) {
      setRequiredDocs([...requiredDocs, newDoc.trim()]);
      setNewDoc('');
    }
  };

  // REMOVE 
  const handleRemoveDocument = (index) => {
    setRequiredDocs(requiredDocs.filter((_, i) => i !== index));
  };

  //  ADD EMI
  const handleAddEmi = () => {
    if (newEmi.trim() && !emiPlans.includes(newEmi.trim())) {
      setEmiPlans([...emiPlans, newEmi.trim()]);
      setNewEmi('');
    }
  };

  // REMOVE EMI 
  const handleRemoveEmi = (index) => {
    setEmiPlans(emiPlans.filter((_, i) => i !== index));
  };

  //  FORM 
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      if (!imagePreview) {
        toast.error('Please upload a loan image');
        return;
      }

      if (requiredDocs.length === 0) {
        toast.error('Please add at least one required document');
        return;
      }

      if (emiPlans.length === 0) {
        toast.error('Please add at least one EMI plan');
        return;
      }

      // Prepare loan data
      const loanData = {
        loanTitle: data.loanTitle,
        shortDescription: data.shortDescription,
        description: data.description,
        category: data.category,
        interestRate: data.interestRate,
        maxLimit: data.maxLimit,
        tenure: data.tenure,
        requiredDocuments: requiredDocs,
        availableEMIPlans: emiPlans,
        loanImage: imagePreview,
        showOnHome: showOnHome,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active'
      };

      // console.log('Submitting loan data:', loanData);

      const response = await axios.post(
        'https://grameen-loan-server.vercel.app/all-loans',
        loanData
      );

      // console.log('Loan created:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Loan Created!',
        html: `
          <p><strong>${data.loanTitle}</strong> has been added successfully!</p>
          <p class="text-sm mt-2">Loan ID: ${response.data.insertedId}</p>
        `,
        confirmButtonText: 'View All Loans',
        showCancelButton: true,
        cancelButtonText: 'Add Another',
        confirmButtonColor: 'var(--primary)',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard/all-loan');
        } else {
          // Reset form for another entry
          reset();
          setImagePreview('');
          setShowOnHome(false);
          setRequiredDocs(['Government ID', 'Proof of Address']);
          setEmiPlans(['6', '12']);
        }
      });

      toast.success('Loan created successfully!');

    } catch (error) {
      // console.error(' Error creating loan:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create Loan',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        confirmButtonColor: 'var(--error)'
      });

      toast.error('Failed to create loan');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
    <div className='min-h-screen w-full overflow-x-hidden px-4 pt-5'>
<div className='max-w-4xl mx-auto'>
    
    <div className=''>
      {/* Header */}
      <div className="mb-8 ">
        <h1 className="text-3xl md:text-4xl font-black mb-2" 
            style={{ color: 'var(--text-primary)' }}>
          Add New Loan
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Create a new loan product for your platform
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="space-y-8">
          
          {/* Basic Information Card */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 break-words" 
                style={{ color: 'var(--text-primary)' }}>
              <FileText className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              Basic Information
            </h2>

            <div className="space-y-6">
              
              {/* Loan Title */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Loan Title <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  {...register('loanTitle', { required: 'Loan title is required' })}
                  type="text"
                  placeholder="e.g., Business Loan"
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: `2px solid ${errors.loanTitle ? 'var(--error)' : 'var(--border)'}`,
                    color: 'var(--text-primary)'
                  }}
                />
                {errors.loanTitle && (
                  <p className="text-sm mt-1 flex items-center gap-1" 
                     style={{ color: 'var(--error)' }}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.loanTitle.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Category <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" 
                       style={{ color: 'var(--text-secondary)' }} />
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none appearance-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: `2px solid ${errors.category ? 'var(--error)' : 'var(--border)'}`,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="">Select category</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Home Improvement">Home Improvement</option>
                    <option value="Personal">Personal</option>
                    <option value="Medical">Medical</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
                {errors.category && (
                  <p className="text-sm mt-1 flex items-center gap-1" 
                     style={{ color: 'var(--error)' }}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Short Description <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <textarea
                  {...register('shortDescription', { 
                    required: 'Short description is required',
                    maxLength: { value: 150, message: 'Maximum 150 characters' }
                  })}
                  rows="2"
                  placeholder="Brief description (max 150 characters)"
                  className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: `2px solid ${errors.shortDescription ? 'var(--error)' : 'var(--border)'}`,
                    color: 'var(--text-primary)'
                  }}
                />
                {errors.shortDescription && (
                  <p className="text-sm mt-1 flex items-center gap-1" 
                     style={{ color: 'var(--error)' }}>
                    <AlertCircle className="w-4 h-4" />
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Full Description
                </label>
                <textarea
                  {...register('description')}
                  rows="5"
                  placeholder="Detailed description of the loan product..."
                  className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: '2px solid var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Loan Details Card */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 break-words" 
                style={{ color: 'var(--text-primary)' }}>
              <DollarSign className="w-6 h-6" style={{ color: 'var(--success)' }} />
              Loan Details
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Max Loan */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Max Loan Amount ($) <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" 
                              style={{ color: 'var(--text-secondary)' }} />
                  <input
                    {...register('maxLimit', { 
                      required: 'Max loan amount is required',
                      min: { value: 100, message: 'Minimum $100' }
                    })}
                    type="number"
                    step="100"
                    placeholder="25000"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: `2px solid ${errors.maxLimit ? 'var(--error)' : 'var(--border)'}`,
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                {errors.maxLimit && (
                  <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                    {errors.maxLimit.message}
                  </p>
                )}
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Interest Rate <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" 
                           style={{ color: 'var(--text-secondary)' }} />
                  <input
                    {...register('interestRate', { required: 'Interest rate is required' })}
                    type="text"
                    placeholder="8% - 15%"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: 'var(--bg)',
                      border: `2px solid ${errors.interestRate ? 'var(--error)' : 'var(--border)'}`,
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                {errors.interestRate && (
                  <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                    {errors.interestRate.message}
                  </p>
                )}
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-semibold mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Tenure <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  {...register('tenure', { required: 'Tenure is required' })}
                  type="text"
                  placeholder="3 - 36 months"
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: `2px solid ${errors.tenure ? 'var(--error)' : 'var(--border)'}`,
                    color: 'var(--text-primary)'
                  }}
                />
                {errors.tenure && (
                  <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                    {errors.tenure.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Required Documents Card */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 break-words" 
                style={{ color: 'var(--text-primary)' }}>
              <List className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
              Required Documents
            </h2>

            {/* Add Document Input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDocument())}
                placeholder="Add required document..."
                className="flex-1 px-4 py-3 rounded-lg outline-none"
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="button"
              
                onClick={handleAddDocument}
                className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'white'
                }}
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>

            {/* Documents List */}
            <div className="flex flex-wrap gap-3">
              {requiredDocs.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{doc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(index)}
                    className="ml-2"
                  >
                    <X className="w-4 h-4" style={{ color: 'var(--error)' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* EMI Plans Card */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 break-words" 
                style={{ color: 'var(--text-primary)' }}>
              <DollarSign className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              EMI Plans
            </h2>

            {/* Add EMI Input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={newEmi}
                onChange={(e) => setNewEmi(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmi())}
                placeholder="e.g., 6 months, 12 months"
                className="flex-1 px-4 py-3 rounded-lg outline-none"
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="button"
                onClick={handleAddEmi}
                className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white'
                }}
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>

            {/* EMI Plans List */}
            <div className="flex flex-wrap gap-3">
              {emiPlans.map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />
                  <span style={{ color: 'var(--text-primary)' }}>{plan}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmi(index)}
                    className="ml-2"
                  >
                    <X className="w-4 h-4" style={{ color: 'var(--error)' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 break-words" 
                style={{ color: 'var(--text-primary)' }}>
              <ImageIcon className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              Loan Image
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Image Preview */}
              {imagePreview && (
                <div
                  className="w-48 h-48 rounded-xl overflow-hidden"
                  style={{ border: '3px solid var(--primary)' }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Upload Button */}
              <label className="flex-1 cursor-pointer">
                <div 
                  className="p-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {uploadingImage ? (
                    <>
                      <Loader className="w-12 h-12 animate-spin" 
                              style={{ color: 'var(--primary)' }} />
                      <p style={{ color: 'var(--text-secondary)' }}>Uploading...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12" 
                              style={{ color: 'var(--primary)' }} />
                      <p className="font-semibold" 
                         style={{ color: 'var(--text-primary)' }}>
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </p>
                      <p className="text-sm" 
                         style={{ color: 'var(--text-secondary)' }}>
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
          </div>

          {/* Show on Home Toggle */}
          <div className="p-4 md:p-6 lg:p-8  rounded-2xl"
               style={{
                 backgroundColor: 'var(--surface)',
                 border: '2px solid var(--border)'
               }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {showOnHome ? (
                  <Eye className="w-6 h-6" style={{ color: 'var(--success)' }} />
                ) : (
                  <EyeOff className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                )}
                <div>
                  <h3 className="text-lg font-bold" 
                      style={{ color: 'var(--text-primary)' }}>
                    Show on Homepage
                  </h3>
                  <p className="text-sm" 
                     style={{ color: 'var(--text-secondary)' }}>
                    Display this loan in the featured section
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <motion.button
                type="button"
                onClick={() => setShowOnHome(!showOnHome)}
                className="relative w-16 h-8 rounded-full transition-colors"
                style={{
                  backgroundColor: showOnHome ? 'var(--success)' : 'var(--border)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{
                    left: showOnHome ? '36px' : '4px'
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white'
              }}
            >
              {submitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Loan...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Loan
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => navigate('/dashboard/all-loan')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-semibold"
              style={{
                // backgroundColor: 'var(--error)',
                color: 'var(--text-primary)',
                border: '2px solid gray'
              }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
    </div>
    </div>
  </>
  );
};

export default AddLoan;