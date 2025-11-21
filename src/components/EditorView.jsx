import React from 'react';
import Header from './Header.jsx';
import AIAssistant from './AIAssistant.jsx';
import '../styles/EditorView.css';

const EditorView = ({ initialData }) => {
    const [data, setData] = React.useState(JSON.parse(JSON.stringify(initialData))); // Deep copy
    const [generatedJson, setGeneratedJson] = React.useState('');
    const [showAssistant, setShowAssistant] = React.useState(false);
    const [copyButtonText, setCopyButtonText] = React.useState('Copy');

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
    };

    const handleItemChange = (section, index, e) => {
        const { name, value } = e.target;
        const items = [...data[section]];
        items[index][name] = value;
        setData(prev => ({ ...prev, [section]: items }));
    };

        // --- About Me Handler ---
        const handleAboutMeChange = (e) => {
            const { name, value } = e.target;
            setData(prev => ({
                ...prev,
                aboutme: { ...prev.aboutme, [name]: value }
            }));
        };

        const handleAboutMeLanguageChange = (index, e) => {
        const { name, value } = e.target;
        setData(prev => {
            const updatedLangs = [...prev.aboutme.Languages];
            updatedLangs[index][name] = value;
            return {
                ...prev,
                aboutme: { ...prev.aboutme, Languages: updatedLangs }
            };
        });
        };

        const handleAddLanguage = () => {
            setData(prev => ({
                ...prev,
                aboutme: {
                    ...prev.aboutme,
                    Languages: [...prev.aboutme.Languages, { name: "", proficiency: "" }]
                }
            }));
        };

        const handleRemoveLanguage = (index) => {
            setData(prev => ({
                ...prev,
                aboutme: {
                    ...prev.aboutme,
                    Languages: prev.aboutme.Languages.filter((_, i) => i !== index)
                }
            }));
        };


    // --- End About Me Handler ---
    const handleAddItem = (section) => {
        let newItem;
        if (section === 'experience') newItem = { company: '', title: '', period: '', description: '' };
        else if (section === 'education') newItem = { institution: '', degree: '', period: '', description: '' };
        else if (section === 'projects') newItem = { name: '', description: '', link: '' };
        else if (section === 'badges') newItem = { name: '', imageUrl: '', link: '' };
        
        if (newItem) {
            // badges is an object of categories => arrays, so handle it differently
            if (section === 'badges') {
                setData(prev => {
                    const badgesCopy = { ...prev.badges };
                    // add to first existing category, or create "New Category" if none exist
                    const firstCategory = Object.keys(badgesCopy)[0] || 'New Category';
                    if (!badgesCopy[firstCategory]) badgesCopy[firstCategory] = [];
                    badgesCopy[firstCategory] = [...badgesCopy[firstCategory], newItem];
                    return { ...prev, badges: badgesCopy };
                });
            } else {
                setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
            }
        }
    };

    const handleRemoveItem = (section, index) => {
        setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
    };
    
    const handleAddItemFromAI = (section, newItemData) => {
        if (section === 'aboutme') {
            setData(prev => ({ ...prev, aboutme: newItemData }));
        } 
        else if (section === 'certificates') {
            const { category, ...certData } = newItemData;

            setData(prev => {
                const certsCopy = { ...prev.certificates };

                if (certsCopy[category]) {
                    certsCopy[category] = [...certsCopy[category], certData];
                } else {
                    certsCopy[category] = [certData];
                }

                return { ...prev, certificates: certsCopy };
            });
        } 
        else {
            setData(prev => {
                if (!prev[section]) return prev; // safety fallback
                return {
                    ...prev,
                    [section]: [...prev[section], newItemData]
                };
            });
        }
    };


    // --- Skills Handlers ---
    const handleSkillCategoryChange = (category, e) => {
        const newSkills = e.target.value.split(',').map(s => s.trim());
        setData(prev => ({
            ...prev,
            skills: { ...prev.skills, [category]: newSkills }
        }));
    };

    const handleCategoryNameChange = (oldName, e, section) => {
        const newName = e.target.value;
        if (!newName.trim() || (data[section].hasOwnProperty(newName) && newName !== oldName)) {
            return; 
        }
        setData(prev => {
            const sectionCopy = { ...prev[section] };
            const entries = Object.entries(sectionCopy).map(([key, value]) => {
                return key === oldName ? [newName, value] : [key, value];
            });
            return { ...prev, [section]: Object.fromEntries(entries) };
        });
    };
    
    const handleAddSkillCategory = () => {
        let newCategoryName = 'New Category';
        let counter = 1;
        while(data.skills.hasOwnProperty(newCategoryName)) {
            newCategoryName = `New Category ${counter}`;
            counter++;
        }
        setData(prev => ({
            ...prev,
            skills: { ...prev.skills, [newCategoryName]: [] }
        }));
    };

    const handleRemoveSkillCategory = (category) => {
        setData(prev => {
            const skillsCopy = { ...prev.skills };
            delete skillsCopy[category];
            return { ...prev, skills: skillsCopy };
        });
    };
    // --- End Skills Handlers ---

    // --- Certificates Handlers ---
    const handleAddCertCategory = () => {
        let newCategoryName = 'New Category';
        let counter = 1;
        while(data.certificates.hasOwnProperty(newCategoryName)) {
            newCategoryName = `New Category ${counter}`;
            counter++;
        }
        setData(prev => ({
            ...prev,
            certificates: { ...prev.certificates, [newCategoryName]: [] }
        }));
    };

    const handleRemoveCertCategory = (category) => {
        setData(prev => {
            const certsCopy = { ...prev.certificates };
            delete certsCopy[category];
            return { ...prev, certificates: certsCopy };
        });
    };
    
    const handleAddCertInCategory = (category) => {
        setData(prev => {
            const certsCopy = { ...prev.certificates };
            certsCopy[category] = [...certsCopy[category], { name: '', link: '' }];
            return { ...prev, certificates: certsCopy };
        });
    };

    const handleRemoveCertInCategory = (category, index) => {
        setData(prev => {
            const certsCopy = { ...prev.certificates };
            certsCopy[category] = certsCopy[category].filter((_, i) => i !== index);
            return { ...prev, certificates: certsCopy };
        });
    };

    const handleCertChange = (category, index, e) => {
        const { name, value } = e.target;
        setData(prev => {
            const certsCopy = { ...prev.certificates };
            const items = [...certsCopy[category]];
            items[index] = { ...items[index], [name]: value };
            certsCopy[category] = items;
            return { ...prev, certificates: certsCopy };
        });
    };
    // --- End Certificates Handlers ---

        // --- Badges Handlers ---
    const handleAddBadgeCategory = () => {
        let newCategoryName = 'New Category';
        let counter = 1;
        while (data.badges && data.badges.hasOwnProperty(newCategoryName)) {
            newCategoryName = `New Category ${counter}`;
            counter++;
        }
        setData(prev => ({ ...prev, badges: { ...prev.badges, [newCategoryName]: [] } }));
    };

    const handleRemoveBadgeCategory = (category) => {
        setData(prev => {
            const copy = { ...prev.badges };
            delete copy[category];
            return { ...prev, badges: copy };
        });
    };

    const handleAddBadgeInCategory = (category) => {
        setData(prev => {
            const copy = { ...prev.badges };
            copy[category] = [...(copy[category] || []), { name: '', imageUrl: '', link: '' }];
            return { ...prev, badges: copy };
        });
    };

    const handleRemoveBadgeInCategory = (category, index) => {
        setData(prev => {
            const copy = { ...prev.badges };
            copy[category] = copy[category].filter((_, i) => i !== index);
            return { ...prev, badges: copy };
        });
    };

    const handleBadgeChange = (category, index, e) => {
        const { name, value } = e.target;
        setData(prev => {
            const copy = { ...prev.badges };
            const items = [...(copy[category] || [])];
            items[index] = { ...items[index], [name]: value };
            copy[category] = items;
            return { ...prev, badges: copy };
        });
    };
    // --- End Badges Handlers ---

    const generateJson = () => {
        const jsonString = JSON.stringify(data, null, 2);
        setGeneratedJson(jsonString);
        setCopyButtonText('Copy'); // Reset button text when new JSON is generated
    };
    
    const handleCopyJson = () => {
        if (generatedJson) {
            navigator.clipboard.writeText(generatedJson).then(() => {
                setCopyButtonText('Copied!');
                setTimeout(() => setCopyButtonText('Copy'), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    const renderEditableSection = (section, fields) => (
      <div className="editor-section">
        <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        {data[section] && data[section].map((item, index) => (
          <div key={index} className="editor-item">
            <button onClick={() => handleRemoveItem(section, index)} className="remove-button">X</button>
            {fields.map(field => (
              field.type === 'textarea'
                ? <textarea key={field.name} name={field.name} value={item[field.name]} onChange={e => handleItemChange(section, index, e)} placeholder={field.placeholder} />
                : <input key={field.name} name={field.name} value={item[field.name]} onChange={e => handleItemChange(section, index, e)} placeholder={field.placeholder} />
            ))}
          </div>
        ))}
        <button className="button" onClick={() => handleAddItem(section)}>Add {section.slice(0, -10)}</button>
      </div>
    );

    return (
        <React.Fragment>
            <Header name="Portfolio Editor" showEditorLink={false} />
            <div className="editor-view app-container">
                <h1>Portfolio Editor</h1>
                <p>Modify the content below directly, or use the AI Assistant to add new items conversationally. When you're done, click "Generate Configuration" to get the updated data object. Copy it and paste it into the <code>portfolioData.json</code> file.</p>
                
                 <div className="editor-section">
                    <h2>AI Assistant</h2>
                    <p>Use our AI assistant to add new items to your portfolio by simply describing what you want to add.</p>
                    <button className="button" onClick={() => setShowAssistant(!showAssistant)}>
                        {showAssistant ? 'Hide' : 'Show'} AI Assistant
                    </button>
                    {showAssistant && <AIAssistant onAddItem={handleAddItemFromAI} />}
                </div>

                {/* Personal Info */}
                <div className="editor-section">
                    <h2>Personal Info</h2>
                    {Object.keys(data.personalInfo).map(key => {
                         const label = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/([A-Z])/g, ' $1').trim();
                         return (
                            <div key={key} className="editor-form-group">
                                <label htmlFor={`personal-${key}`}>{label}</label>
                                <input type="text" id={`personal-${key}`} name={key} value={data.personalInfo[key]} onChange={handlePersonalInfoChange} />
                            </div>
                        );
                    })}
                </div>

                {/* About Me */}
                <div className="editor-section">
                    <h2>About Me</h2>

                    {/* Description */}
                    <div className="editor-form-group">
                        <label htmlFor="aboutme-description">Description</label>
                        <textarea
                            id="aboutme-description"
                            name="description"
                            value={data.aboutme?.description || ''}
                            onChange={handleAboutMeChange}
                            placeholder="Write your professional summary..."
                            rows={6}
                        />
                    </div>

                    {/* Availability */}
                    <div className="editor-form-group">
                        <label htmlFor="aboutme-availability">Availability</label>
                        <input
                            id="aboutme-availability"
                            name="Availability"
                            value={data.aboutme?.Availability || ''}
                            onChange={handleAboutMeChange}
                            placeholder="e.g., Immediate"
                        />
                    </div>

                    {/* Location */}
                    <div className="editor-form-group">
                        <label htmlFor="aboutme-location">Location</label>
                        <input
                            id="aboutme-location"
                            name="Location"
                            value={data.aboutme?.Location || ''}
                            onChange={handleAboutMeChange}
                            placeholder="e.g., Dubai, UAE"
                        />
                    </div>

                    {/* Preferred Locations */}
                    <div className="editor-form-group">
                        <label htmlFor="aboutme-preferred">Preferred Locations</label>
                        <input
                            id="aboutme-preferred"
                            name="PreferredLocations"
                            value={data.aboutme?.PreferredLocations || ''}
                            onChange={handleAboutMeChange}
                            placeholder="e.g., UAE, Saudi Arabia, Qatar, Remote"
                        />
                    </div>

                    {/* Relocation */}
                    <div className="editor-form-group">
                        <label htmlFor="aboutme-relocation">Relocation</label>
                        <input
                            id="aboutme-relocation"
                            name="Relocation"
                            value={data.aboutme?.Relocation || ''}
                            onChange={handleAboutMeChange}
                            placeholder="e.g., Open to relocate anywhere"
                        />
                    </div>

                    {/* Languages */}
                    <h3 style={{ marginTop: "20px" }}>Languages</h3>
                    {data.aboutme?.Languages?.map((lang, index) => (
                        <div key={index} className="editor-item" style={{ position: "relative", paddingLeft: "10px" }}>
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveLanguage(index)}
                                style={{ top: "5px", right: "5px" }}
                            >
                                X
                            </button>

                            <input
                                name="name"
                                value={lang.name}
                                onChange={(e) => handleAboutMeLanguageChange(index, e)}
                                placeholder="Language (e.g., English)"
                                style={{ marginBottom: "5px" }}
                            />

                            <input
                                name="proficiency"
                                value={lang.proficiency}
                                onChange={(e) => handleAboutMeLanguageChange(index, e)}
                                placeholder="Proficiency (e.g., Native)"
                            />
                        </div>
                    ))}

                    <button className="button" onClick={handleAddLanguage}>
                        Add Language
                    </button>
                </div>


                {renderEditableSection('experience', [
                    { name: 'company', placeholder: 'Company' },
                    { name: 'title', placeholder: 'Title' },
                    { name: 'period', placeholder: 'Period' },
                    { name: 'description', placeholder: 'Description', type: 'textarea' },
                ])}
                
                 {renderEditableSection('education', [
                    { name: 'institution', placeholder: 'Institution' },
                    { name: 'degree', placeholder: 'Degree' },
                    { name: 'period', placeholder: 'Period' },
                    { name: 'description', placeholder: 'Description', type: 'textarea' },
                ])}

                {renderEditableSection('projects', [
                    { name: 'name', placeholder: 'Project Name' },
                    { name: 'description', placeholder: 'Description', type: 'textarea' },
                    { name: 'link', placeholder: 'Project Link' },
                ])}

                {/* Certificates */}
                 {/* <div className="editor-section">
                    <h2>Certificates</h2>
                    {Object.entries(data.certificates).map(([category, certs]) => (
                        <div key={category} className="editor-item">
                            <button onClick={() => handleRemoveCertCategory(category)} className="remove-button">X</button>
                             <div className="editor-form-group">
                                <label>Category Name</label>
                                <input type="text" value={category} onChange={(e) => handleCategoryNameChange(category, e, 'certificates')} />
                            </div>
                            {certs.map((cert, index) => (
                                <div key={index} style={{ border: '1px solid #444', padding: '10px', borderRadius: '5px', position: 'relative', marginTop: '10px' }}>
                                    <button onClick={() => handleRemoveCertInCategory(category, index)} className="remove-button" style={{top: '5px', right: '5px', height: '20px', width: '20px', fontSize: '12px'}}>X</button>
                                    <input name="name" value={cert.name} onChange={(e) => handleCertChange(category, index, e)} placeholder="Certificate Name" style={{marginBottom: '5px'}}/>
                                    <input name="link" value={cert.link} onChange={(e) => handleCertChange(category, index, e)} placeholder="Certificate Link" />
                                    <input name="dateObtained" value={cert.dateObtained} onChange={(e) => handleCertChange(category, index, e)} placeholder="Certificate Date Obtained" />
                                    <input name="expiryDate" value={cert.expiryDate} onChange={(e) => handleCertChange(category, index, e)} placeholder="Certificate Expiry Date" />
                                </div>
                            ))}
                            <button className="button" onClick={() => handleAddCertInCategory(category)} style={{marginTop: '10px'}}>Add Certificate to {category}</button>
                        </div>
                    ))}
                    <button className="button" onClick={handleAddCertCategory}>Add Certificate Category</button>
                </div> */}

                {/* Certificates */}
                <div className="editor-section">
                <h2>Certificates</h2>

                {Object.entries(data.certificates).map(([category, certs]) => (
                    <div key={category} className="editor-item">
                    
                    <button
                        onClick={() => handleRemoveCertCategory(category)}
                        className="remove-button"
                    >
                        X
                    </button>

                    {/* Category Name */}
                    <div className="editor-form-group">
                        <label>Category Name</label>
                        <input
                        type="text"
                        value={category}
                        onChange={(e) =>
                            handleCategoryNameChange(category, e, "certificates")
                        }
                        />
                    </div>

                    {/* 🔥 ONE HEADER ROW */}
                    <div className="cert-grid header-row" id="cert-header-row">
                        <span>Certificate Name</span>
                        <span>Certificate Link</span>
                        <span>Date Obtained</span>
                        <span>Expiry Date</span>
                        <span></span> {/* for delete button column */}
                    </div>

                    {/* Cert Rows */}
                    {certs.map((cert, index) => (
                        <div key={index} className="cert-grid cert-row" id="cert-data-row">
                        <input
                            name="name"
                            value={cert.name}
                            onChange={(e) => handleCertChange(category, index, e)}
                            placeholder="Name"
                        />

                        <input
                            name="link"
                            value={cert.link}
                            onChange={(e) => handleCertChange(category, index, e)}
                            placeholder="Link"
                        />

                        <input
                            name="dateObtained"
                            value={cert.dateObtained}
                            onChange={(e) => handleCertChange(category, index, e)}
                            placeholder="Date Obtained"
                        />

                        <input
                            name="expiryDate"
                            value={cert.expiryDate}
                            onChange={(e) => handleCertChange(category, index, e)}
                            placeholder="Expiry Date"
                        />

                        {/* Remove Button */}
                        <button
                            onClick={() =>
                            handleRemoveCertInCategory(category, index)
                            }
                            className="remove-button small"
                        >
                            X
                        </button>
                        </div>
                    ))}

                    <button
                        className="button"
                        onClick={() => handleAddCertInCategory(category)}
                        style={{ marginTop: "10px" }}
                    >
                        Add Certificate to {category}
                    </button>
                    </div>
                ))}

                <button className="button" onClick={handleAddCertCategory}>
                    Add Certificate Category
                </button>
                </div>


                {/* Badges */}
                <div className="editor-section">
                    <h2>Badges</h2>
                    {Object.entries(data.badges || {}).map(([category, badges]) => (
                        <div key={category} className="editor-item">
                            <button onClick={() => handleRemoveBadgeCategory(category)} className="remove-button">X</button>
                            <div className="editor-form-group">
                                <label>Category Name</label>
                                <input type="text" value={category} onChange={(e) => handleCategoryNameChange(category, e, 'badges')} placeholder="Category Name" />
                            </div>

                            {badges.map((badge, index) => (
                                <div key={index} style={{ border: '1px solid #444', padding: '10px', borderRadius: '5px', position: 'relative', marginTop: '10px' }}>
                                    <button onClick={() => handleRemoveBadgeInCategory(category, index)} className="remove-button" style={{ top: '5px', right: '5px', height: '20px', width: '20px', fontSize: '12px' }}>X</button>
                                    <input name="name" value={badge.name} onChange={(e) => handleBadgeChange(category, index, e)} placeholder="Badge Name" style={{ marginBottom: '5px' }} />
                                    <input name="imageUrl" value={badge.imageUrl} onChange={(e) => handleBadgeChange(category, index, e)} placeholder="Image URL" style={{ marginBottom: '5px' }} />
                                    <input name="link" value={badge.link} onChange={(e) => handleBadgeChange(category, index, e)} placeholder="Badge Link" />
                                </div>
                            ))}

                            <button className="button" onClick={() => handleAddBadgeInCategory(category)} style={{ marginTop: '10px' }}>Add Badge to {category}</button>
                        </div>
                    ))}
                    <button className="button" onClick={handleAddBadgeCategory} style={{ marginTop: '10px' }}>Add Badge Category</button>
                </div>

                {/* Skills */}
                <div className="editor-section">
                    <h2>Skills</h2>
                    {Object.entries(data.skills).map(([category, skills]) => (
                        <div key={category} className="editor-item">
                            <button onClick={() => handleRemoveSkillCategory(category)} className="remove-button">X</button>
                            <div className="editor-form-group">
                                <label>Category Name</label>
                                <input 
                                    type="text" 
                                    value={category}
                                    onChange={(e) => handleCategoryNameChange(category, e, 'skills')}
                                    placeholder="Category Name"
                                />
                            </div>
                            <div className="editor-form-group">
                                <label>Skills (comma-separated)</label>
                                <textarea 
                                    value={skills.join(', ')} 
                                    onChange={(e) => handleSkillCategoryChange(category, e)}
                                    placeholder="e.g., React, Node.js, ..."
                                />
                            </div>
                        </div>
                    ))}
                    <button className="button" onClick={handleAddSkillCategory}>Add Skill Category</button>
                </div>
                
                <button className="button" onClick={generateJson} style={{width: '100%', padding: '1rem'}}>Generate Configuration</button>

                {generatedJson && (
                    <div className="editor-section">
                        <div className="generated-json-header">
                            <h2>Generated Configuration</h2>
                            <button className="button" onClick={handleCopyJson}>{copyButtonText}</button>
                        </div>
                        <p>Copy the content below and replace the entire content of your <code>portfolioData.json</code> file.</p>
                        <pre className="generated-json"><code>{generatedJson}</code></pre>
                    </div>
                )}
                
                <div className="editor-section">
                    <h2>Local Testing</h2>
                    <p>To see your changes before you deploy them, you need to run a local web server. This is a standard security requirement for modern web apps.</p>
                    <p>We've created a <code>README.md</code> file with simple, step-by-step instructions on how to do this. Please refer to it for guidance.</p>
                </div>
                
                <div className="editor-section">
                    <h2>GitHub Actions Deployment</h2>
                    <p>To automatically deploy your portfolio, a <code>deploy.yml</code> file has been generated for you. Move this file to the <code>.github/workflows/</code> directory in your repository.</p>
                    <p>After adding this file, go to your repository's settings, find the "Pages" section, and set the "Source" to "GitHub Actions".</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EditorView;