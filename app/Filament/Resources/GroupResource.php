<?php

namespace App\Filament\Resources;

use App\Enums\GenreTypes;
use App\Enums\GroupTypes;
use App\Filament\Resources\GroupResource\Pages;
use App\Models\Group;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class GroupResource extends Resource
{
    protected static ?string $model = Group::class;

    protected static ?string $slug = 'groups';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Basic Information Section
                Section::make('Basic Information')
                    ->description('Provide the basic details about the group.')
                    ->schema([
                        TextInput::make('name')
                            ->label('Group Name')
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $state) {
                                if (! $get('is_slug_changed_manually') && filled($state)) {
                                    $set('slug', Str::slug($state));
                                }
                            })
                            ->reactive()
                            ->required()
                            ->placeholder('Enter the group’s name'),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->afterStateUpdated(function (Set $set) {
                                $set('is_slug_changed_manually', true);
                            })
                            ->required()
                            ->placeholder('Generated automatically from the name'),

                        Select::make('type')
                            ->options(GroupTypes::class)
                            ->required()
                            ->placeholder('Select the group type')
                            ->searchable()
                            ->preload()
                            ->native(false),

                        TextInput::make('agency')
                            ->label('Agency')
                            ->placeholder('Enter the group’s agency'),

                        TextInput::make('fandom_name')
                            ->label('Fandom Name')
                            ->placeholder('Enter the group’s fandom name'),

                        Fieldset::make('Genre')
                            ->schema([
                                Select::make('type')
                                    ->options(GenreTypes::class)
                                    ->required()
                                    ->placeholder('Select the group genre'),
                            ]),

                        Hidden::make('is_slug_changed_manually')
                            ->default(false)
                            ->dehydrated(false),

                        TextInput::make('spotify_id')
                            ->label('Spotify ID')
                            ->placeholder('Enter the Spotify ID')
                            ->helperText('The unique identifier from Spotify'),
                    ])
                    ->collapsible(),

                // Biography Section
                Section::make('Group Description')
                    ->schema([
                        RichEditor::make('bio')
                            ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'heading'])
                            ->placeholder('Write a detailed description of the group'),
                    ])
                    ->collapsible(),

                // Activity Section
                Section::make('Activity')
                    ->schema([
                        Checkbox::make('active')
                            ->label('Active')
                            ->helperText('Indicate if the group is currently active'),

                        DatePicker::make('debute_date')
                            ->label('Debut Date')
                            ->displayFormat('d / m / Y')
                            ->helperText('When did the group debut?'),
                    ])
                    ->collapsible(),

                // Media Section
                Fieldset::make('Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('cover_photo')
                            ->avatar()
                            ->collection('cover_photos')
                            ->imagePreviewHeight('150') // Adds image preview
                            ->helperText('Upload a high-quality cover photo for the group.'),

                        SpatieMediaLibraryFileUpload::make('gallery')
                            ->collection('gallery')
                            ->imagePreviewHeight('150')
                            ->helperText('Upload a gallery of photos for the group.')
                            ->multiple(),

                        FileUpload::make('background_video')
                            ->label('Background Video')
                            ->acceptedFileTypes(['video/mp4'])
                            ->maxSize(50120)
                            ->directory('group-videos')
                            ->preserveFilenames()
                            ->helperText('Upload a short background video loop (MP4 format, max 50MB)')
                            ->columnSpanFull(),
                    ])
                    ->columns(1),

                // Metadata Section
                Section::make('Metadata')
                    ->schema([
                        Placeholder::make('created_at')
                            ->label('Created Date')
                            ->content(fn (?Group $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Last Modified Date')
                            ->content(fn (?Group $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('active'),

                TextColumn::make('debute_date')
                    ->date(),

            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGroup::route('/'),
            'create' => Pages\CreateGroup::route('/create'),
            'edit' => Pages\EditGroup::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }
}
